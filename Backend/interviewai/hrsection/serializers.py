from rest_framework import serializers
from .models import Job

class JobSerializer(serializers.ModelSerializer):
    hr = serializers.StringRelatedField()
    class Meta:
        model = Job
        fields = '__all__'
        read_only_fields = ['hr', 'created_at']
