from django.db import models
from django.utils.text import slugify

class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta:
        abstract = True

class Service(TimeStampedModel):
    CATEGORY_CHOICES = [
        ('web', 'Web Applications'), ('infrastructure', 'Server & Infrastructure'),
        ('custom', 'Custom Software'), ('support', 'Maintenance & Support'),
    ]
    category = models.CharField(max_length=32, choices=CATEGORY_CHOICES, unique=True)
    title = models.CharField(max_length=180)
    title_fa = models.CharField(max_length=180, blank=True)
    short_description = models.TextField()
    short_description_fa = models.TextField(blank=True)
    description = models.TextField(blank=True)
    description_fa = models.TextField(blank=True)
    features = models.JSONField(default=list, blank=True, help_text='List of feature strings')
    features_fa = models.JSONField(default=list, blank=True, help_text='List of Persian feature strings')
    sort_order = models.PositiveSmallIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['sort_order', 'id']

    def __str__(self):
        return self.title

class Project(TimeStampedModel):
    CATEGORY_CHOICES = Service.CATEGORY_CHOICES
    slug = models.SlugField(max_length=180, unique=True)
    category = models.CharField(max_length=32, choices=CATEGORY_CHOICES)
    title = models.CharField(max_length=180)
    title_fa = models.CharField(max_length=180, blank=True)
    summary = models.TextField()
    summary_fa = models.TextField(blank=True)
    overview = models.TextField(blank=True)
    overview_fa = models.TextField(blank=True)
    highlights = models.JSONField(default=list, blank=True)
    highlights_fa = models.JSONField(default=list, blank=True)
    technologies = models.JSONField(default=list, blank=True)
    is_featured = models.BooleanField(default=False)
    is_demo = models.BooleanField(default=True)
    is_published = models.BooleanField(default=True)
    sort_order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ['sort_order', '-created_at']
        indexes = [models.Index(fields=['is_published', 'category'])]

    def __str__(self):
        return self.title

class ContactInquiry(TimeStampedModel):
    STATUS_CHOICES = [
        ('new', 'New'), ('in_progress', 'In progress'),
        ('answered', 'Answered'), ('closed', 'Closed'),
    ]
    name = models.CharField(max_length=120)
    email = models.EmailField(max_length=254)
    company = models.CharField(max_length=160, blank=True)
    service = models.CharField(max_length=32)
    message = models.TextField(max_length=5000)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='new', db_index=True)
    admin_notes = models.TextField(blank=True)
    source_language = models.CharField(max_length=5, choices=[('en', 'English'), ('fa', 'Persian')], default='en')
    ip_address = models.GenericIPAddressField(null=True, blank=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.name} — {self.email} ({self.created_at:%Y-%m-%d})'
