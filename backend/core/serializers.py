from rest_framework import serializers
from .models import ContactInquiry, Project, Service

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['id', 'category', 'title', 'title_fa', 'short_description', 'short_description_fa',
                  'description', 'description_fa', 'features', 'features_fa', 'sort_order']

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['id', 'slug', 'category', 'title', 'title_fa', 'summary', 'summary_fa',
                  'overview', 'overview_fa', 'highlights', 'highlights_fa', 'technologies',
                  'is_featured', 'is_demo']

class ContactInquirySerializer(serializers.ModelSerializer):
    website = serializers.CharField(write_only=True, required=False, allow_blank=True, max_length=200)
    class Meta:
        model = ContactInquiry
        fields = ['name', 'email', 'company', 'service', 'message', 'source_language', 'website']

    def validate_website(self, value):
        if value.strip():
            raise serializers.ValidationError('Invalid submission.')
        return value

    def validate_service(self, value):
        allowed = {'web', 'infrastructure', 'custom', 'support', 'other'}
        if value not in allowed:
            raise serializers.ValidationError('Please select a valid service.')
        return value

    def validate_name(self, value):
        value = value.strip()
        if len(value) < 2:
            raise serializers.ValidationError('Please enter a valid name.')
        return value

    def validate_message(self, value):
        value = value.strip()
        if len(value) < 10:
            raise serializers.ValidationError('Please provide a little more detail.')
        return value

    def create(self, validated_data):
        validated_data.pop('website', None)
        request = self.context.get('request')
        if request:
            validated_data['ip_address'] = request.META.get('REMOTE_ADDR')
        return super().create(validated_data)
