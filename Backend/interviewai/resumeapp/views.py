from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from .models import ResumeUpload
from .resume_parser import parse_pdf
from .resume_crew import run_resume_coach

class ResumeCoachAPIView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, *args, **kwargs):
        file = request.FILES.get('resume')
        job_description = request.data.get('job_description', '')

        if not file:
            return Response({'error': 'No file uploaded'}, status=400)

        if not job_description:
            return Response({'error': 'Job description is required'}, status=400)

        # Save the file in DB
        resume = ResumeUpload.objects.create(user=request.user, resume=file, job_description=job_description)

        # Read contents from file
        file.seek(0)
        contents = file.read()
        resume_text = parse_pdf(contents)

        # Run CrewAI logic with resume text and JD
        analysis_result = run_resume_coach(resume_text, job_description)
        # print(analysis_result)
        return Response({
            'message': 'Resume processed successfully.',
            'submission_id': resume.id,
            'analysis': analysis_result,
        }, status=201)
