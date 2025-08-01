from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
import random
from .models import InterviewSession
from .models import InterviewQuestion
from django.shortcuts import get_object_or_404



@api_view(['GET'])
def get_available_domains(request):
    domains = [
        "Web Development",
        "Data Science",
        "Machine Learning",
        "Java",
        "Python",
        "Database Management",
        "Cloud Computing",
        "Cyber Security",
        "Blockchain"
    ]
    return Response({"domains": domains})


from .utils import generate_questions_with_mistral

class StartInterviewView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        domain = request.data.get('domain')
        user = request.user

        if not domain:
            return Response({"error": "Domain is required."}, status=400)

        # 🔁 Generate questions using Mistral
        print(f"Generating questions for domain: {domain}")
        questions = generate_questions_with_mistral(domain, num_questions=3)
        if not questions:
            return Response({"error": "No questions generated."}, status=500)

        # ✅ Create Interview Session
        session = InterviewSession.objects.create(user=user, domain=domain)

        # ✅ Save all generated questions
        for i, q in enumerate(questions):
            InterviewQuestion.objects.create(
                session=session,
                question_text=q,
                order=i + 1
            )

        return Response({
            "session_id": session.id,
            "question": questions[0]
        })



from .utils import score_answer_with_mistral  # You'll implement this
from django.shortcuts import get_object_or_404
import json

class SubmitAnswerView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, session_id):
        user = request.user
        answer = request.data.get("answer", "").strip()
        print(f"Received answer: {answer}")

        if not answer:
            return Response({"error": "Answer is required."}, status=400)

        # ✅ Get session
        print(f"Fetching session with ID: {session_id} for user: {user.id}")
        session = get_object_or_404(InterviewSession, id=session_id, user=user)
        
        # ✅ Get unanswered question (in order)
        try:
            print(f"Fetching next unanswered question for session: {session_id}")
            question_obj = session.questions.filter(answer_text__isnull=True).order_by("order").first()
        except InterviewQuestion.DoesNotExist:
            return Response({"error": "No pending questions."}, status=404)

        if not question_obj:
            return Response({"error": "Interview already completed."}, status=400)

        # ✅ Save answer
        print(f"Saving answer for question: {question_obj.question_text}")
        question_obj.answer_text = answer

        # ✅ Score answer using Mistral
        # score = score_answer_with_mistral(question_obj.question_text, answer)
        question_obj.score = 0
        question_obj.save()

        # ✅ Check if all questions are now answered
        remaining = session.questions.filter(answer_text__isnull=True).count()
        print(f"Remaining unanswered questions: {remaining}")

        if remaining == 0:
            session.completed = True
            session.save()
            return Response({"message": "Interview completed", "is_complete": True})

        # ✅ Get next question in order
        next_question = session.questions.filter(answer_text__isnull=True).order_by("order").first()
        print(f"Next question: {next_question.question_text if next_question else 'None'}")

        return Response({
            "message": "Answer submitted successfully",
            "is_complete": False,
            "next_question": next_question.question_text
        })
    

import requests
class EvaluateInterviewView(APIView):
    def get(self, request, session_id):
        try:
            session = InterviewSession.objects.get(id=session_id)
            questions = InterviewQuestion.objects.filter(session=session)

            if not questions.exists():
                return Response({"error": "No questions found for this session."}, status=404)

            qa_list = ""
            for idx, q in enumerate(questions, 1):
                qa_list += f"{idx}. Q: {q.question_text}\nA: {q.answer_text}\n\n"
            
            print("Preparing to evaluate interview with questions and answers:")
            print(qa_list)

            prompt = f"""
You are a technical interviewer. Evaluate each of the candidate's answers.

For each question, provide:
- A score out of 10
- Short evaluation (Correct / Partial / Incorrect)
- Detailed feedback

Then give an overall feedback and a total score out of 100.

Questions and Answers:
{qa_list}
"""

            # Make a request to the Ollama API
            ollama_response = requests.post(
                "http://localhost:11434/api/generate",
                json={
                    "model": "mistral",
                    "prompt": prompt,
                    "stream": False
                }
            )

            if ollama_response.status_code == 200:
                feedback = ollama_response.json().get("response", "").strip()
                session.feedback = feedback
                session.save()
                return Response({"feedback": feedback})
            else:
                return Response({"error": "Mistral via Ollama failed.", "details": ollama_response.text},
                                status=500)

        except InterviewSession.DoesNotExist:
            return Response({"error": "Session not found."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

