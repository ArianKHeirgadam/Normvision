from django.urls import path
from .views import ContactInquiryCreateView, ProjectDetailView, ProjectListView, ServiceListView

urlpatterns = [
    path('services/', ServiceListView.as_view(), name='service-list'),
    path('projects/', ProjectListView.as_view(), name='project-list'),
    path('projects/<slug:slug>/', ProjectDetailView.as_view(), name='project-detail'),
    path('contact/', ContactInquiryCreateView.as_view(), name='contact-create'),
]
