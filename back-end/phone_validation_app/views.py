from django.shortcuts import render, get_object_or_404
from .models import Phone
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
from .serializers import PhoneSerializer


# Create your views here.
#Validates & creates a new phone object
class PhoneValidation(TokenReq):
    def post(self, request):
        try:
            body = json.loads(request.body)
            # Grab the phone number from the request body below
            number = body['phone_number']
            countryCode = body['countryCode']
            print('ACCESS NUMBER VALUE FROM PHONE_NUM KEY!!!!!!!',number, countryCode)
            API_KEY = env.get('API_KEY')
            #make sure the number is in the correct format
            adjusted_number = number[0] + number[1] + number[2]+"+" + number[3] + number[4] + number[5]+ "-" + number[6] + number[7] + number[8] + number[9]

            #Construct request to the API
            endpoint = f"https://api-bdc.net/data/phone-number-validate?number={adjusted_number}&countryCode={countryCode}&key={API_KEY}"
            response = requests.get(endpoint)
            print('LOOK A POTATO CANDY RECIPE', response)
            data_copy = request.data.copy() #copy of data from above
            print('DATA IS HERE >>>', data_copy)
            print('RESPONSE IS HERE >>>', response) # just 200
            if response.status_code == 200:
                data = response.json()
                print('DATA IS HERE >>>', data)

                #check if phone number exists in the database
                if Phone.objects.filter(phone_number=data.get('e164Format')).exists():
                    return Response({'error':'Phone number already exists!'}, status=HTTP_400_BAD_REQUEST)

                #create & save the phone object
                new_phone = Phone(
                    phone_number=data.get('e164Format'),
                    countryCode=countryCode,
                    localityLanguage=data.get('localityLanguage', 'en'),
                    is_valid=data.get('isValid', False),
                    location=data.get('location', ''),
                    lineType=data.get('lineType', 'unknown'),
                    currency_name=data['country']['currency'].get('name', 'USD'),
                    countryFlagEmoji=data['country'].get('countryFlagEmoji', ''),
                    country_name=data['country'].get('name', '')
                )
                new_phone.full_clean()
                new_phone.save()
                data['user'] = request.user.id
                return Response({'message':'Phone info validated and saved', 'phone': new_phone.phone_number}, status=HTTP_201_CREATED)
            else:
                return Response({'error':'Phone info not validated', 'phone': number}, status=HTTP_400_BAD_REQUEST)
        except ValidationError as e:
            return Response(e, status=HTTP_400_BAD_REQUEST)


#Retrieves a phone object by id or phone number with/without a + in front
class A_phone_record(TokenReq):
    def get(self, request, identifier):
        if identifier.isdigit() and len(identifier) > 7:
            #Treat this as a phone number with a + in front
            format_phone_number = "+" + identifier
            #Treat as phone number without a + in front
        elif identifier.startswith('+') and identifier[1:].isdigit():
            format_phone_number = identifier
        else:
            #Treat this as an ID
            phone = get_object_or_404(Phone, pk=identifier)
            return Response({
                'phone_number': phone.phone_number,
                'countryCode': phone.countryCode,
                'localityLanguage': phone.localityLanguage,
                'is_valid': phone.is_valid,
                'location': phone.location,
                'lineType': phone.lineType,
                'currency_name': phone.currency_name,
                'countryFlagEmoji': phone.countryFlagEmoji,
                'country_name': phone.country_name
            }, status=HTTP_200_OK)

        phone = get_object_or_404(Phone, phone_number=format_phone_number)
        return Response({
            'phone_number': phone.phone_number,
            'countryCode': phone.countryCode,
            'localityLanguage': phone.localityLanguage,
            'is_valid': phone.is_valid,
            'location': phone.location,
            'lineType': phone.lineType,
            'currency_name': phone.currency_name,
            'countryFlagEmoji': phone.countryFlagEmoji,
            'country_name': phone.country_name
        }, status=HTTP_200_OK)

    def delete(self, request, identifier):
        if identifier.isdigit() and len(identifier) > 7:
            #Treat this as a phone number with a + in front
            format_phone_number = "+" + identifier
            #Treat as phone number without a + in front
        elif identifier.startswith('+') and identifier[1:].isdigit():
            format_phone_number = identifier
        else:
            #Treat this as an ID
            phone = get_object_or_404(Phone, pk=identifier)
            phone.delete()
            return Response('Phone number deleted', status=HTTP_204_NO_CONTENT)

        phone = get_object_or_404(Phone, phone_number=format_phone_number)
        phone.delete()
        return Response('Phone number deleted', status=HTTP_204_NO_CONTENT)

    def put(self, request, identifier):
        if identifier.isdigit() and len(identifier) > 7:
            #Treat this as a phone number with a + in front
            format_phone_number = "+" + identifier
            #Treat as phone number without a + in front
        elif identifier.startswith('+') and identifier[1:].isdigit():
            format_phone_number = identifier
        else:
            #Treat this as an ID
            phone = get_object_or_404(Phone, pk=identifier)
            data = request.data.copy()
            for key in data:
                setattr(phone, key, data[key])
            try:
                phone.full_clean()
                phone.save()
                return Response({
                    'phone_number': phone.phone_number,
                    'countryCode': phone.countryCode,
                    'localityLanguage': phone.localityLanguage,
                    'is_valid': phone.is_valid,
                    'location': phone.location,
                    'lineType': phone.lineType,
                    'currency_name': phone.currency_name,
                    'countryFlagEmoji': phone.countryFlagEmoji,
                    'country_name': phone.country_name
                }, status=HTTP_200_OK)
            except ValidationError as e:
                return Response(e, status=HTTP_400_BAD_REQUEST)

        phone = get_object_or_404(Phone, phone_number=format_phone_number)
        data = request.data.copy()
        for key in data:
            setattr(phone, key, data[key])
        try:
            phone.full_clean()
            phone.save()
            return Response({
                'phone_number': phone.phone_number,
                'countryCode': phone.countryCode,
                'localityLanguage': phone.localityLanguage,
                'is_valid': phone.is_valid,
                'location': phone.location,
                'lineType': phone.lineType,
                'currency_name': phone.currency_name,
                'countryFlagEmoji': phone.countryFlagEmoji,
                'country_name': phone.country_name
            }, status=HTTP_200_OK)
        except ValidationError as e:
            return Response(e, status=HTTP_400_BAD_REQUEST)

#Retrieves all phone objects
class All_phone_records(TokenReq):
    def get(self, request):
        phones = Phone.objects.all()
        serializer = PhoneSerializer(phones, many=True)
        return Response(serializer.data, status=HTTP_200_OK)

#Retrieves all phone objects that are valid -> is_valid = True for whitelist
class Whitelist_phone_records(TokenReq):
    def get(self, request):
        phones = Phone.objects.filter(is_valid=True)
        serializer = PhoneSerializer(phones, many=True)
        return Response(serializer.data, status=HTTP_200_OK)

#Retrieves all phone objects that are invalid -> is_valid = False for blacklist
class Blacklist_phone_records(TokenReq):
    def get(self, request):
        phones = Phone.objects.filter(is_valid=False)
        serializer = PhoneSerializer(phones, many=True)
        return Response(serializer.data, status=HTTP_200_OK)
