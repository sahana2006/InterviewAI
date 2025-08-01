from rest_framework import serializers
from .models import ResumeCoachSubmission

class ResumeCoachSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResumeCoachSubmission
        fields = ['id', 'user', 'resume', 'job_description', 'created_at']
        read_only_fields = ['id', 'created_at']
