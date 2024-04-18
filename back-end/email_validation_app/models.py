from django.db import models
from django.core.validators import EmailValidator
# from user_app.models import User

class Email(models.Model):
    email_address = models.CharField(
        max_length=50,
        unique=True,
        validators=[EmailValidator()],
        blank=False,  # Ensures field must not be empty
        null=False   # Ensures the db does not store NULL for this field
    )
    is_valid = models.BooleanField(default=False)
    isSyntaxValid = models.BooleanField(default=False)
    isMailServerDefined = models.BooleanField(default=False)
    isKnownSpammerDomain = models.BooleanField(default=False)
    isDisposable = models.BooleanField(default=False)
