from django.db import models

# Create your models here.
from django.contrib.auth.models import User

class CodingTestQuestion(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    input_data = models.TextField(help_text="Input passed to the code")
    expected_output = models.TextField(help_text="Expected output for comparison")
    category = models.CharField(max_length=100, default="General")  # E.g., "Arrays", "Graphs", etc.

    def __str__(self):
        return self.title


class CodingTestSubmission(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="code_submissions")
    question = models.ForeignKey(CodingTestQuestion, on_delete=models.CASCADE, related_name="submissions")

    code = models.TextField()
    language_id = models.IntegerField(default=54)
    stdin = models.TextField(blank=True)
    expected_output = models.TextField(blank=True)
    stdout = models.TextField(blank=True, null=True)
    stderr = models.TextField(blank=True, null=True)
    compile_output = models.TextField(blank=True, null=True)

    status_id = models.IntegerField(default=0)
    status_description = models.CharField(max_length=100, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Submission by {self.user.username} for {self.question.title}"
