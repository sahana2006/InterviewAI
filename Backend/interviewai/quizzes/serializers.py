from rest_framework import serializers
from .models import Quiz, Question, QuizAttempt

class QuizSerializer(serializers.ModelSerializer):
    status = serializers.SerializerMethodField()

    class Meta:
        model = Quiz
        fields = ['id', 'title', 'description', 'domain', 'status']

    def get_status(self, quiz):
        user = self.context['request'].user
        try:
            attempt = QuizAttempt.objects.get(user=user, quiz=quiz)
            if attempt.status == 'completed':
                return 'completed'
            return 'not_started'
        except QuizAttempt.DoesNotExist:
            return 'not_started'

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        exclude = ['correct_option']  # don’t send answer to frontend

class QuizAttemptSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizAttempt
        fields = '__all__'
