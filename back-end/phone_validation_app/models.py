from django.db import models

# Create your models here.

class Phone(models.Model):
    phone_number = models.CharField(max_length=15)
    is_valid = models.BooleanField(default=False)
    country_name = models.CharField(max_length=30)
    localityLanguage = models.CharField(max_length=3)
    location = models.CharField(max_length=50)
    countryFlagEmoji = models.CharField()
