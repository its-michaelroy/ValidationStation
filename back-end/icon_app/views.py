from django.shortcuts import render, get_object_or_404
from user_app.views import TokenReq
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
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
from django.core.exceptions import ValidationError


# Create your views here.
#Validates & creates a new email object
class Icons(TokenReq):
    def post(self, request):
        try:
            body = json.loads(request.body)
            icon = body['icon']
            print(icon)
            API_KEY = env.get('NOUN_PROJECT_API_KEY')
            SECRET_KEY = env.get('NOUN_PROJECT_SECRET_KEY')
            auth = OAuth1({API_KEY}, {SECRET_KEY})
            endpoint = "https://api.thenounproject.com/v2/icon/1"
            response = requests.get(endpoint, auth=auth)
            print(response.content)
            data_copy = request.data.copy()
            print('data_copy >', data_copy)
        except ValidationError as e:
            return Response(e.message_dict, status=HTTP_400_BAD_REQUEST)
