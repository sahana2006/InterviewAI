from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import CodingTestQuestion, CodingTestSubmission
from .serializers import CodingTestQuestionSerializer, CodingTestSubmissionSerializer
from rest_framework.permissions import IsAuthenticated
import requests
import os


class CodingPracticeQuestionListView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        questions = CodingTestQuestion.objects.all()
        serializer = CodingTestQuestionSerializer(questions, many=True)
        return Response(serializer.data)

class CodingTestQuestionDetailView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, question_id):
        try:
            question = CodingTestQuestion.objects.get(id=question_id)
            serializer = CodingTestQuestionSerializer(question)
            return Response(serializer.data)
        except CodingTestQuestion.DoesNotExist:
            return Response({"error": "Question not found"}, status=404)

from django.conf import settings

class SubmitCodeView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        code = request.data.get("code")
        question = request.data.get("question")
        language_id = request.data.get("language_id")
        stdin = request.data.get("stdin", "")
        expected_output = request.data.get("expected_output", "")
        print("In the SubmitCodeView")
        print(language_id)

        JUDGE0_URL = "https://judge0-ce.p.rapidapi.com/submissions"
        headers = {
            "content-type": "application/json",
            "X-RapidAPI-Key": settings.JUDGE0_API_KEY,
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com"
        }

        payload = {
            "source_code": code,
            "language_id": language_id,
            "stdin": stdin,
            "expected_output": expected_output,
        }

        try:
            response = requests.post(
                f"{JUDGE0_URL}?base64_encoded=false&wait=true",
                json=payload,
                headers=headers
            )
            judge_response = response.json()
            print("Response generated", judge_response)

            # print("user", request.user)
            # print("question", question)
            # print("code", code)
            # print("language_id", language_id)
            # print("stdin", stdin)
            # print("expected_output", expected_output)
            # print("stdout", judge_response.get("stdout"))
            # print("stderr", judge_response.get("stderr"))
            # print("compile_output", judge_response.get("compile_output"))
            # print("status_id", judge_response["status"]["id"])
            # print("status_description", judge_response["status"]["description"])
            question_id = question["id"]
            question_instance = CodingTestQuestion.objects.get(id=question_id)
            # Save to DB
            submission = CodingTestSubmission.objects.create(
                user=request.user,  # Assuming request.user is available
                question=question_instance,  # Assuming question is fetched from request or context
                code=code,
                language_id=language_id,
                stdin=stdin,
                expected_output=expected_output,
                stdout=judge_response.get("stdout"),
                stderr=judge_response.get("stderr"),
                compile_output=judge_response.get("compile_output"),
                status_id=judge_response["status"]["id"],
                status_description=judge_response["status"]["description"]
            )
            print("Saved in Db")
            # Optionally return submission ID
            return Response({
                "submission_id": submission.id,
                "result": judge_response
            }, status=response.status_code)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)