from rest_framework import serializers
from .models import CodingTestQuestion, CodingTestSubmission

class CodingTestQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CodingTestQuestion
        fields = '__all__'


class CodingTestSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CodingTestSubmission
        fields = '__all__'