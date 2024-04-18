from django.shortcuts import render, get_object_or_404
from user_app.views import TokenReq
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import requests
from requests_oauthlib import OAuth1
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_400_BAD_REQUEST,
    HTTP_401_UNAUTHORIZED,
    HTTP_404_NOT_FOUND,
    )
from validation_proj.settings import env
import json
from django.core.exceptions import ValidationError


# Create your views here.
#Validates & creates a new email object
class Icon_isValid(TokenReq):
    def get(self, request):
        API_KEY = env.get('NOUN_PROJECT_API_KEY')
        SECRET_KEY = env.get('NOUN_PROJECT_SECRET_KEY')
        auth = OAuth1(API_KEY, SECRET_KEY)
        name = "smile"
        endpoint = f"https://api.thenounproject.com/v2/icon?query={name}&limit=1"
        response = requests.get(endpoint, auth=auth)

        if response.json().get('icons'):
            icon_url = response.json().get('icons')[0].get("thumbnail_url")
            return Response(icon_url, status=HTTP_200_OK)
        else:
            return Response({'error':'Icon url retrieval failed!'}, status=HTTP_400_BAD_REQUEST)

class Icon_notValid(TokenReq):
    def get(self, request):
        API_KEY = env.get('NOUN_PROJECT_API_KEY')
        SECRET_KEY = env.get('NOUN_PROJECT_SECRET_KEY')
        auth = OAuth1(API_KEY, SECRET_KEY)
        name = "frown"
        endpoint = f"https://api.thenounproject.com/v2/icon?query={name}&limit=1"
        response = requests.get(endpoint, auth=auth)
        if response.json().get('icons'):
            icon_url = response.json().get('icons')[0].get("thumbnail_url")
            return Response(icon_url, status=HTTP_200_OK)
        else:
            return Response({'error':'Icon url retrieval failed!'}, status=HTTP_400_BAD_REQUEST)
