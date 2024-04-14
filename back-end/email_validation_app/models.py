from django.db import models
from django.core.validators import EmailValidator
from user_app.models import User

class Email(models.Model):
    email_address = models.CharField(
        max_length=50,
        unique=True,
        validators=[EmailValidator()],
        blank=False,  # Ensures the field must not be empty
        null=False   # Ensures the database does not store NULL for this field
    )
    is_valid = models.BooleanField(default=False)
    isSyntaxValid = models.BooleanField(default=False)
    isMailServerDefined = models.BooleanField(default=False)
    isKnownSpammerDomain = models.BooleanField(default=False)
    isDisposable = models.BooleanField(default=False)

    # # Or OneToMany relationship with User
    # user = models.ForeignKey(
    #     User,
    #     on_delete=models.SET_NULL,
    #     null=True,
    #     related_name='emails'
    # )
