from accounts.models import User
from accounts.serializers import UserSerializer, LoginSerializer, RegisterSerializer
from django.shortcuts import get_object_or_404
from knox.models import AuthToken
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView


class RegisterAPI(APIView):

    def post(self, request):
        serialize = RegisterSerializer(data=request.data)
        serialize.is_valid(raise_exception=True)
        user = serialize.save()
        instance, token = AuthToken.objects.create(user)
        return Response({
            "user": UserSerializer(user).data,
            "token": token
        })


class LoginAPI(APIView):

    def post(self, request):
        serialize = LoginSerializer(data=request.data)
        serialize.is_valid(raise_exception=True)
        user = serialize.validated_data
        instance, token = AuthToken.objects.create(user)
        return Response({
            "user": UserSerializer(user).data,
            "token": token
        })


class UserAPI(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        user = get_object_or_404(User, pk=request.user.id)
        serialize = UserSerializer(user)
        return Response(serialize.data)
