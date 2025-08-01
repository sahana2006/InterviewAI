from django.db import models

# Create your models here.
from django.contrib.auth.models import User

class Job(models.Model):
    JOB_TYPES = [
        ('Full-time', 'Full-time'),
        ('Intern', 'Intern'),
        ('Remote', 'Remote'),
        ('Hybrid', 'Hybrid'),
    ]

    hr = models.ForeignKey(User, on_delete=models.CASCADE, related_name='jobs')
    title = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    required_skills = models.TextField()
    number_of_openings = models.PositiveIntegerField()
    job_type = models.CharField(max_length=20, choices=JOB_TYPES)
    deadline = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
