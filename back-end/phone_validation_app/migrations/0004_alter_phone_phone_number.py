# Generated by Django 5.0.4 on 2024-04-13 01:57

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('phone_validation_app', '0003_phone_currency_name_phone_linetype_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='phone',
            name='phone_number',
            field=models.CharField(max_length=16, validators=[django.core.validators.RegexValidator('^\\+?[1-9]\\d{1,14}$')]),
        ),
    ]
