from django.db import models

# Create your models here.

class Email(models.Model):
    email_address = models.CharField(max_length=50)
    is_valid = models.BooleanField(default=False)
    isSyntaxValid = models.BooleanField(default=False)
    isMailServerDefined = models.BooleanField(default=False)
    isKnownSpammerDomain = models.BooleanField(default=False)
    isDisposableEmailAddress = models.BooleanField(default=False)
