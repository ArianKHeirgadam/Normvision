from rest_framework import generics, permissions
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import ContactInquiry, Project, Service
from .serializers import ContactInquirySerializer, ProjectSerializer, ServiceSerializer

class ServiceListView(generics.ListAPIView):
    serializer_class = ServiceSerializer
    permission_classes = [permissions.AllowAny]
    queryset = Service.objects.filter(is_active=True)

class ProjectListView(generics.ListAPIView):
    serializer_class = ProjectSerializer
    permission_classes = [permissions.AllowAny]
    queryset = Project.objects.filter(is_published=True)
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ['title', 'title_fa', 'summary', 'summary_fa']
    ordering_fields = ['sort_order', 'created_at', 'title']
    ordering = ['sort_order', '-created_at']

    def get_queryset(self):
        qs = super().get_queryset()
        category = self.request.query_params.get('category')
        if category and category != 'all':
            qs = qs.filter(category=category)
        featured = self.request.query_params.get('featured')
        if featured in {'true', 'false'}:
            qs = qs.filter(is_featured=(featured == 'true'))
        return qs

class ProjectDetailView(generics.RetrieveAPIView):
    serializer_class = ProjectSerializer
    permission_classes = [permissions.AllowAny]
    queryset = Project.objects.filter(is_published=True)
    lookup_field = 'slug'

class ContactInquiryCreateView(generics.CreateAPIView):
    serializer_class = ContactInquirySerializer
    permission_classes = [permissions.AllowAny]
    queryset = ContactInquiry.objects.all()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response({'message': 'Your inquiry has been received.', 'success': True}, status=201)
