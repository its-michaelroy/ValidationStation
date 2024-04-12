from django.urls import path
from .views import PhoneValidation

urlpatterns = [
    path('', PhoneValidation.as_view(), name='phone_validation'),

]
