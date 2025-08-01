from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class ResumeUpload(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='resume_submissions')
    resume = models.FileField(upload_to='resumes/')
    job_description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"ResumeSubmission by {self.user.username} on {self.created_at.strftime('%Y-%m-%d')}"
