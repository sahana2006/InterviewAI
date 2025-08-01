from django.urls import path
from .views import ResumeCoachAPIView

urlpatterns = [
    path('resume/coach/', ResumeCoachAPIView.as_view(), name='resume-coach')
]