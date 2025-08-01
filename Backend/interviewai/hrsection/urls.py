from django.urls import path
from .views import JobCreateView, ValidJobListView

urlpatterns = [
    path('create/', JobCreateView.as_view(), name='job-create'),
    path('jobs/valid/', ValidJobListView.as_view(), name='valid-jobs'),
]