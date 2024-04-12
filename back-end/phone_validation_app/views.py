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
        print('YO DAWG!!!!!!!',request.body)
        body = json.loads(request.body)
        print('YO WHATS WITH THE MONEY!!!!!!!',body)
        number = body['phone_number']
        print('YO WHATS WITH THE NUMBER!!!!!!!',number)
        API_KEY = env.get('API_KEY')
        adjusted_number = number[0] + number[1] + number[2]+"+" + number[3] + number[4] + number[5]+ "-" + number[6] + number[7] + number[8] + number[9]
        endpoint = f"https://api-bdc.net/data/phone-number-validate?number={adjusted_number}&countryCode=us&localityLanguage=en&key={API_KEY}"
        response = requests.get(endpoint)
        print(response)
        data = request.data.copy()
            # data['user'] = request.user.id
        # new_phone = Phone(**data)
        # try:
        #     new_phone.full_clean()
        #     new_phone.save()
            # return Response({'phone': new_phone.phone_number}, status=HTTP_201_CREATED)
        return Response({'phone': response}, status=HTTP_201_CREATED)
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
