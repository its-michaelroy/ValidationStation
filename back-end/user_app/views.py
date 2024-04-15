from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_204_NO_CONTENT,
    HTTP_400_BAD_REQUEST,
    HTTP_401_UNAUTHORIZED,
    HTTP_404_NOT_FOUND
    )
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from django.core.exceptions import ValidationError
from django.contrib.auth import authenticate, login, logout
from .models import User


# Create your views here.
class TokenReq(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

class Info(TokenReq):
    def get(self, request):
        try:
            a_user = request.user
            return Response({'user': a_user.email}, status=HTTP_200_OK)
        except ValidationError as e:
            return Response(e, status=HTTP_400_BAD_REQUEST)

    def put(self, request):
        try:
            a_user = request.user
            data = request.data.copy()
            a_user.email = data.get('email', a_user.email)
            current_password = data.get('password')
            if current_password and data.get('new_password'):
                if a_user.check_password(current_password):
                    a_user.set_password(data.get('new_password'))
                else:
                    return Response('Invalid password', status=HTTP_400_BAD_REQUEST)
            a_user.full_clean()
            a_user.save()
            return Response({'user': a_user.email}, status=HTTP_200_OK)
        except ValidationError as e:
            return Response(e, status=HTTP_400_BAD_REQUEST)

    def delete(self, request):
        try:
            a_user = request.user
            a_user.delete()
            return Response('User deleted', status=HTTP_204_NO_CONTENT)
        except ValidationError as e:
            return Response(e, status=HTTP_400_BAD_REQUEST)

class Register(APIView):
    def post(self, request):
        data = request.data.copy()
        data["username"] = request.data.get('username', request.data.get('email'))
        new_user = User(**data)
        try:
            new_user.full_clean()
            new_user.save()
            new_user.set_password(data.get('password'))
            new_user.save()
            login(request, new_user)
            token = Token.objects.create(user=new_user)
            return Response({'user': new_user.username, 'token':token.key}, status=HTTP_201_CREATED)
        except ValidationError as e:
            return Response(e, status=HTTP_400_BAD_REQUEST)

class Log_in(APIView):
    def post(self, request):
        data = request.data.copy()
        data['username'] = request.data.get('username', request.data.get('email'))
        user = authenticate(username=data.get('username'), password=data.get('password'))
        if user:
            login(request, user)
            token, created = Token.objects.get_or_create(user=user)
            return Response({'user': user.username, 'token':token.key}, status=HTTP_200_OK)
        return Response('Invalid user', status=HTTP_400_BAD_REQUEST)

class Log_out(TokenReq):
    def post(self, request):
        try:
            request.user.auth_token.delete()
            logout(request)
            return Response('User logged out', status=HTTP_204_NO_CONTENT)
        except ValidationError as e:
            return Response(e, status=HTTP_400_BAD_REQUEST)
