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
from rest_framework.exceptions import NotFound, PermissionDenied


# Create your views here.
# Base request class for token authentication & user to be authenticated
class TokenReq(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

#View handles user info, updating user info, and deleting user
class Info(TokenReq):
    def get(self, request):
        try:
            a_user = request.user
            return Response({'user': a_user.email}, status=HTTP_200_OK)
        except ValidationError as e:
            return Response(e, status=HTTP_400_BAD_REQUEST)

    # Update user info
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

    # Delete user
    def delete(self, request):
        email_to_delete = request.data.get('email')
        if not request.user.is_superuser:
            raise PermissionDenied("You do not have permission to perform this action.")

        if not email_to_delete:
            return Response({"error": "Email address is required."}, status=HTTP_400_BAD_REQUEST)

        try:
            user_to_delete = User.objects.get(email=email_to_delete)
            user_to_delete.delete()
            return Response('User deleted successfully.', status=HTTP_204_NO_CONTENT)
        except User.DoesNotExist:
            raise NotFound('User with the provided email does not exist.')
        except ValidationError as e:
            return Response(e.message_dict, status=HTTP_400_BAD_REQUEST)
        except Exception as ex:
            print(f"Unexpected error: {ex}")
            return Response({'error': 'An unexpected error occurred while deleting the user.'})

# Register a new user
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

# Log in a user
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

# Log out a user
class Log_out(TokenReq):
    def post(self, request):
        try:
            request.user.auth_token.delete()
            logout(request)
            return Response('User logged out', status=HTTP_204_NO_CONTENT)
        except ValidationError as e:
            return Response(e, status=HTTP_400_BAD_REQUEST)

# Create a superuser
class MASTER_USER(APIView):
    def post(self, request):
        # if not request.user.is_authenticated or not request.user.is_superuser:
        #     return Response({'error': 'Unauthorized user'}, status=HTTP_401_UNAUTHORIZED)

        data = request.data.copy()
        data["username"] = data.get('username', data.get('email'))

        try:
            new_user = User(**data)
            new_user.is_superuser = True
            new_user.is_staff = True  # Optionally set if you want them to access the admin site
            new_user.set_password(data['password'])
            new_user.full_clean()
            new_user.save()

            token = Token.objects.create(user=new_user)

            return Response({
                'user': new_user.username,
                'token': token.key,
                'is_superuser': new_user.is_superuser,
                'is_staff': new_user.is_staff
            }, status=HTTP_201_CREATED)

        except ValidationError as e:
            return Response(e.message_dict, status=HTTP_400_BAD_REQUEST)
