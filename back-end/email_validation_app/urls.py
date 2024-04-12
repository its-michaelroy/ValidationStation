from django.urls import path
from .views import EmailValidation

urlpatterns = [
    path('', EmailValidation.as_view(), name='email_validation'),

]
