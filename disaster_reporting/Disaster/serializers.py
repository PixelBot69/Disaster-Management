from rest_framework import serializers
from .models import Report,DisasterProtocol,BloodDonationRequest
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)


class ReportSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Report
        fields = ['id', 'name', 'location', 'report_type', 'description', 'contact', 'user']
        
    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)

class DisasterProtocolSerializer(serializers.ModelSerializer):
    class Meta:
        model = DisasterProtocol
        fields = ['report_type', 'protocol']

class BloodDonationRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = BloodDonationRequest
        fields = '__all__'

