from .models import Email
from django.shortcuts import render, get_object_or_404
from user_app.views import TokenReq
from rest_framework.views import APIView
from rest_framework.response import Response
import requests
from requests_oauthlib import OAuth1
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_204_NO_CONTENT,
    HTTP_400_BAD_REQUEST,
    HTTP_401_UNAUTHORIZED,
    HTTP_403_FORBIDDEN,
    HTTP_404_NOT_FOUND,
    )
from validation_proj.settings import env
import json

# Create your views here.
class EmailValidation(TokenReq):
    def post(self, request):
        print('YO EMAIL REQUEST.BODY!!!!!!!',request.body)
        body = json.loads(request.body)
        print('YO EMAIL BODY!!!!!!!',body)
        email = body['email_address']
        print('YO JUST EMAIL!!!!!!!',email)
        API_KEY = env.get('API_KEY')
        endpoint = f"https://api-bdc.net/data/email-verify?emailAddress={email}&key={API_KEY}"
        response = requests.get(endpoint)
        print(response)
        data = request.data.copy()
        return Response({'email': response}, status=HTTP_201_CREATED)

    # def get(self, request):
    #     try:
    #         email = Email.objects.get(user=request.user.id)
    #         return Response({'email': email.email, 'is_valid': email.is_valid}, status=HTTP_200_OK)
    #     except Email.DoesNotExist:
    #         return Response('Email not found', status=HTTP_404_NOT_FOUND)

    # def put(self, request):
    #     email = get_object_or_404(Email, user=request.user.id)
    #     data = request.data.copy()
    #     for key in data:
    #         setattr(email, key, data[key])
    #     try:
    #         email.full_clean()
    #         email.save()
    #         return Response({'email': email.email, 'is_valid': email.is_valid}, status=HTTP_200_OK)
    #     except ValidationError as e:
    #         return Response(e, status=HTTP_400_BAD_REQUEST)
