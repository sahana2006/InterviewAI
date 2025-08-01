from django.contrib import admin

from .models import CodingTestQuestion, CodingTestSubmission
# Register your models here.
admin.site.register(CodingTestQuestion)
admin.site.register(CodingTestSubmission)