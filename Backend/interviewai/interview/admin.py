from django.contrib import admin

from .models import InterviewSession, InterviewQuestion

# Register your models here.
admin.site.register(InterviewSession)
admin.site.register(InterviewQuestion)