from django.db import models
from django.core import validators as v

# Create your models here.
class Phone(models.Model):
    phone_number = models.CharField(
        max_length=16,
        null=False,
        blank=False,
        validators=[v.RegexValidator(r'^\+(?:[0-9] ?){6,14}[0-9]$')]
        )
    # US, CA, etc.
    countryCode = models.CharField(max_length=3, null=False, blank=False)
    localityLanguage = models.CharField(max_length=20, default='en')
    is_valid = models.BooleanField(default=False)
    location = models.CharField(max_length=50)
    lineType = models.CharField(max_length=20, default='unknown')
    currency_name = models.CharField(max_length=20, default='USD')
    countryFlagEmoji = models.CharField(max_length=10, default='🇺🇸')
    country_name = models.CharField(max_length=30)
    isKnownSpammerDomain = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.phone_number} ({self.country_name})'
