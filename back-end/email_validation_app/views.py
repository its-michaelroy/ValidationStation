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
import re

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
    def get(self, request, identifier):
        if identifier.isdigit():
            email = get_object_or_404(Email, id=identifier)
        else:
            email = get_object_or_404(Email, email_address=identifier)

        serializer = EmailSerializer(email)
        return Response(serializer.data, status=HTTP_200_OK)

    #Delete a single email object by its id or email
    def delete(self, request, identifier):
        if identifier.isdigit():
            email = get_object_or_404(Email, id=identifier)
        else:
            email = get_object_or_404(Email, email_address=identifier)
        email.delete()
        return Response({'message':'Email record deleted!'}, status=HTTP_204_NO_CONTENT)

    #Update a single email object by its id or email
    def put(self, request, identifier):
        if identifier.isdigit():
            email = get_object_or_404(Email, id=identifier)
        else:
            email = get_object_or_404(Email, email_address=identifier)

        body = json.loads(request.body)
        email.email_address = body.get('email_address', email.email_address)
        email.is_valid = body.get('is_valid', email.is_valid)
        email.isSyntaxValid = body.get('isSyntaxValid', email.isSyntaxValid)
        email.isMailServerDefined = body.get('isMailServerDefined', email.isMailServerDefined)
        email.isKnownSpammerDomain = body.get('isKnownSpammerDomain', email.isKnownSpammerDomain)
        email.isDisposable = body.get('isDisposable', email.isDisposable)
        email.full_clean()
        email.save()
        return Response({'message':'Email record updated!'}, status=HTTP_200_OK)

#Retrieve all email objects!
class All_email_records(TokenReq):
    def get(self, request):
        emails = Email.objects.all()
        serializer = EmailSerializer(emails, many=True)
        return Response(serializer.data, status=HTTP_200_OK)

#Retrieve all email objects that are in the whitelist
class Whitelist_email_records(TokenReq):
    def get(self, request):
        emails = Email.objects.filter(is_valid=True)
        serializer = EmailSerializer(emails, many=True)
        return Response(serializer.data, status=HTTP_200_OK)

#Retrieve all email objects that are in the blacklist
class Blacklist_email_records(TokenReq):
    def get(self, request):
        emails = Email.objects.filter(is_valid=False)
        serializer = EmailSerializer(emails, many=True)
        return Response(serializer.data, status=HTTP_200_OK)
