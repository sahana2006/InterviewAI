from sys import path
from django.urls import path
from .views import RegisterView, CurrentUserAPIView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path("user/", CurrentUserAPIView.as_view(), name="current-user"),
]