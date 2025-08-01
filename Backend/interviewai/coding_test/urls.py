from django.urls import path    
from .views import CodingTestQuestionDetailView, SubmitCodeView, CodingPracticeQuestionListView

urlpatterns = [
    path('questions/', CodingPracticeQuestionListView.as_view(), name='coding_test_questions'),
    path('question/<int:question_id>/', CodingTestQuestionDetailView.as_view(), name='coding_test_question_detail'),
    path('submit_code/', SubmitCodeView.as_view(), name='coding_test_submit'),
]