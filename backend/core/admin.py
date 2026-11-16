from django.contrib import admin
from .models import ContactInquiry, Project, Service

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'is_active', 'sort_order', 'updated_at')
    list_filter = ('category', 'is_active')
    search_fields = ('title', 'title_fa', 'short_description')
    ordering = ('sort_order', 'id')

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'is_featured', 'is_demo', 'is_published', 'sort_order')
    list_filter = ('category', 'is_featured', 'is_demo', 'is_published')
    search_fields = ('title', 'title_fa', 'summary', 'slug')
    prepopulated_fields = {'slug': ('title',)}
    ordering = ('sort_order', '-created_at')

@admin.register(ContactInquiry)
class ContactInquiryAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'service', 'status', 'created_at')
    list_filter = ('status', 'service', 'source_language', 'created_at')
    search_fields = ('name', 'email', 'company', 'message')
    readonly_fields = ('created_at', 'updated_at', 'ip_address')
    list_editable = ('status',)
    date_hierarchy = 'created_at'
