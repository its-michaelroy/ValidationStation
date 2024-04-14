from .models import Email
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
from .serializers import EmailSerializer

# Create your views here.
#Validates & creates a new email object
class EmailValidation(TokenReq):
    def post(self, request):
        try:
            body = json.loads(request.body)
            # Grab the email from the request body below
            email = body['email_address']
            print(email)
            API_KEY = env.get('API_KEY')
            endpoint = f"https://api-bdc.net/data/email-verify?emailAddress={email}&key={API_KEY}"
            response = requests.get(endpoint)
            print(response)
            data_copy = request.data.copy()
            print('data_copy >', data_copy)

            if response.status_code == 200:
                data = response.json()
                print("YO DATA HERE >>> ", data)

                #check if email exists in the database
                if Email.objects.filter(email_address=data.get('inputData')).exists():
                    return Response({'error':'Email already exists!'}, status=HTTP_400_BAD_REQUEST)

                #create a new email object
                new_email = Email(
                    email_address = data.get('inputData'),
                    is_valid = data.get('isValid'),
                    isSyntaxValid = data.get('isSyntaxValid'),
                    isMailServerDefined = data.get('isMailServerDefined'),
                    isKnownSpammerDomain = data.get('isKnownSpammerDomain'),
                    isDisposable = data.get('isDisposable')
                )
                new_email.full_clean()
                new_email.save()
                return Response({'message':'email info successfully saved!','email': new_email.email_address}, status=HTTP_201_CREATED)
            else:
                return Response({'error':'Email validation failed!'}, status=HTTP_400_BAD_REQUEST)
        except ValidationError as e:
            return Response(e.message_dict, status=HTTP_400_BAD_REQUEST)

#Retrieve a single email object by its id or email
class A_email_record(TokenReq):
    def get(self, request, email_id):
        try:
            email = get_object_or_404(Email, id=email_id)
            serializer = EmailSerializer(email)
            return Response(serializer.data, status=HTTP_200_OK)
        except:
            email = get_object_or_404(Email, email_address=email_id)
            serializer = EmailSerializer(email)
            return Response(serializer.data, status=HTTP_200_OK)
