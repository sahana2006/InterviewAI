
from os import path

from django.urls import path
from .views import QuizListView, StartQuizView, CompleteQuizView

urlpatterns = [
    path('domainquizzes/', QuizListView.as_view(), name='quiz-list'),
    path('<int:quiz_id>/start/', StartQuizView.as_view(), name='quiz-start'),
    path('<int:quiz_id>/complete/', CompleteQuizView.as_view(), name='quiz-complete'),
]