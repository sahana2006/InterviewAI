from django.urls import path
from .views import StartInterviewView, get_available_domains, SubmitAnswerView, EvaluateInterviewView

urlpatterns = [
    path('domains/', get_available_domains, name='get_domains'),
    path('start/', StartInterviewView.as_view(), name='start_interview'),
    path('<int:session_id>/answer/', SubmitAnswerView.as_view(), name='submit_answer'),
    path('<int:session_id>/evaluate/', EvaluateInterviewView.as_view(), name='evaluate_interview'),
]
