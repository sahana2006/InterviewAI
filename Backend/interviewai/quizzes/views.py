from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Quiz, QuizAttempt, Question
from .serializers import QuizSerializer, QuizAttemptSerializer, QuestionSerializer

class QuizListView(generics.ListAPIView):
    serializer_class = QuizSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Quiz.objects.all()

    def get_serializer_context(self):
        return {'request': self.request}

class StartQuizView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, quiz_id):
        user = request.user
        try:
            quiz = Quiz.objects.get(id=quiz_id)
        except Quiz.DoesNotExist:
            return Response({'error': 'Quiz not found'}, status=404)

        attempt, created = QuizAttempt.objects.get_or_create(user=user, quiz=quiz)

        if attempt.status == 'completed':
            return Response({'detail': 'Quiz already completed.'}, status=400)

        # Status will now be treated as completed or not
        questions = Question.objects.filter(quiz=quiz)
        serialized_questions = QuestionSerializer(questions, many=True).data

        return Response({
            'message': 'Quiz started',
            'attempt_id': attempt.id,
            'status': attempt.status,
            'questions': serialized_questions
        }, status=200)
    

class CompleteQuizView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, quiz_id):
        user = request.user
        submitted_answers = request.data.get("answers", {})

        try:
            attempt = QuizAttempt.objects.get(user=user, quiz_id=quiz_id)
        except QuizAttempt.DoesNotExist:
            return Response({'error': 'Attempt not found'}, status=404)

        questions = Question.objects.filter(quiz_id=quiz_id)
        score = 0
        total = questions.count()
        results = []

        for question in questions:
            qid = str(question.id)
            correct = question.correct_option
            user_answer = submitted_answers.get(qid)
            
            is_correct = user_answer == correct
            print(f"Question ID: {qid}, User Answer: {user_answer}, Correct Answer: {correct} -> Is Correct: {is_correct}")
            if is_correct:
                score += 1

            results.append({
                'question': question.text,
                'your_answer': user_answer,
                'correct_answer': correct,
                'is_correct': is_correct
            })

        attempt.status = 'completed'
        attempt.score = score
        attempt.save()

        return Response({
            'message': 'Quiz marked as completed',
            'score': score,
            'total': total,
            'results': results,
        }, status=200)