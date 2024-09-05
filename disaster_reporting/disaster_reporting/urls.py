from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from Disaster import views
from django.conf import settings
from django.conf.urls.static import static

router = routers.DefaultRouter()
router.register(r'reports', views.ReportViewSet, basename='report')
router.register(r'blood-requests', views.BloodDonationRequestViewSet)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('protocol/<str:report_type>/', views.DisasterProtocolView.as_view(), name='disaster-protocol'),
    path('api/register/', views.RegisterView.as_view(), name='register'),
    path('api/login/', views.LoginView.as_view(), name='login'),
    path('api/', include(router.urls)),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
