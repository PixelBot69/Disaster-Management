from rest_framework import viewsets, permissions
from .models import Report,DisasterProtocol,BloodDonationRequest
from .serializers import ReportSerializer, DisasterProtocolSerializer,BloodDonationRequestSerializer,LoginSerializer,UserSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework import generics
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView



def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }
class ReportViewSet(viewsets.ModelViewSet):
    queryset = Report.objects.all()
    serializer_class = ReportSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Return reports filtered by the current user
        return Report.objects.filter(user=self.request.user)


class DisasterProtocolView(generics.ListAPIView):
    serializer_class = DisasterProtocolSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        report_type = self.request.query_params.get('report_type', None)
        if report_type:
            return DisasterProtocol.objects.filter(report_type=report_type)
        return DisasterProtocol.objects.none()


class BloodDonationRequestViewSet(viewsets.ModelViewSet):
    queryset = BloodDonationRequest.objects.all()
    serializer_class = BloodDonationRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return BloodDonationRequest.objects.filter(user=self.request.user)



    def perform_create(self, serializer):
        serializer.save(sender=self.request.user)

class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        user = User.objects.get(username=serializer.validated_data['username'])
        tokens = get_tokens_for_user(user)
        return Response(tokens, status=status.HTTP_201_CREATED)

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format=None):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']
            user = authenticate(username=username, password=password)
            if user is not None:
                token = get_tokens_for_user(user)
                return Response({'token': token, 'user_id': user.id, 'msg': 'Login Success'}, status=status.HTTP_200_OK)
            else:
                return Response({'errors': {'non_field_errors': ['username or Password is not valid']}}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)