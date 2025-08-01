from django.db import models

# Create your models here.
from django.contrib.auth.models import User
from django.forms import JSONField


class InterviewSession(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    domain = models.CharField(max_length=100)
    started_at = models.DateTimeField(auto_now_add=True)
    completed = models.BooleanField(default=False)
    feedback = models.TextField(blank=True, null=True)
    def __str__(self):
        return f"{self.user.username} - {self.domain}"
    
class InterviewQuestion(models.Model):
    session = models.ForeignKey(InterviewSession, on_delete=models.CASCADE, related_name='questions')
    question_text = models.JSONField(default=dict)
    answer_text = models.TextField(blank=True, null=True)
    order = models.IntegerField()   