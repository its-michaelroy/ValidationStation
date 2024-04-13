from django.shortcuts import render, get_object_or_404
from .models import Phone
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
class PhoneValidation(TokenReq):
    def post(self, request):
        body = json.loads(request.body)
        # Grab the phone number from the request body below
        number = body['phone_number']
        countryCode = body['countryCode']
        print('ACCESS NUMBER VALUE FROM PHONE_NUM KEY!!!!!!!',number, countryCode)
        API_KEY = env.get('API_KEY')
        #make sure the number is in the correct format
        adjusted_number = number[0] + number[1] + number[2]+"+" + number[3] + number[4] + number[5]+ "-" + number[6] + number[7] + number[8] + number[9]
        #COnstruct request to the API
        endpoint = f"https://api-bdc.net/data/phone-number-validate?number={adjusted_number}&countryCode={countryCode}&localityLanguage=en&key={API_KEY}"
        response = requests.get(endpoint)
        print('LOOK A POTATO CANDY RECIPE', response)
        data_copy = request.data.copy() #copy of data from above
        print('DATA IS HERE >>>', data_copy
        print('RESPONSE IS HERE >>>', response) # just 200
        if response.status_code == 200:
            data = response.json()
            print('DATA IS HERE >>>', data)

            #create & save the phone object
            new_phone = Phone(**data)
            new_phone.save()
            return Response({'phone': new_phone.phone_number}, status=HTTP_201_CREATED)

















            # data['user'] = request.user.id
        # new_phone = Phone(**data)
        # try:
        #     new_phone.full_clean()
        #     new_phone.save()
            # return Response({'phone': new_phone.phone_number}, status=HTTP_201_CREATED)
        # return Response({'phone': response}, status=HTTP_201_CREATED)
        # except ValidationError as e:
        #     return Response(e, status=HTTP_400_BAD_REQUEST)

    # def get(self, request):
    #     try:
    #         phone = Phone.objects.get(user=request.user.id)
    #         return Response({'phone': phone.phone_number, 'is_valid': phone.is_valid}, status=HTTP_200_OK)
    #     except Phone.DoesNotExist:
    #         return Response('Phone number not found', status=HTTP_404_NOT_FOUND)

    # def put(self, request):
    #     phone = get_object_or_404(Phone, user=request.user.id)
    #     data = request.data.copy()
    #     for key in data:
    #         setattr(phone, key, data[key])
    #     try:
    #         phone.full_clean()
    #         phone.save()
    #         return Response({'phone': phone.phone_number, 'is_valid': phone.is_valid}, status=HTTP_200_OK)
    #     except ValidationError as e:
    #         return Response(e, status=HTTP_400_BAD_REQUEST)

    # def delete(self, request):
    #     phone = get_object_or_404(Phone, user=request.user.id)
    #     phone.delete()
    #     return Response('Phone number deleted', status=HTTP_204_NO_CONTENT)
