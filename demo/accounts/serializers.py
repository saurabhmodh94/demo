from django.contrib.auth import authenticate
from rest_framework import serializers

from accounts.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'phone_number')


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'phone_number')
        extra_kwargs = {'passwprd': {'write_only': True}}

    def create(self, validated_data):
        return  User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'], phone_number=validated_data['phone_number'])


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError('Invalid Credentials')
