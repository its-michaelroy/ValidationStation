# Generated by Django 5.0.4 on 2024-04-12 23:01

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('phone_validation_app', '0002_rename_localitylanguage_phone_countrycode'),
    ]

    operations = [
        migrations.AddField(
            model_name='phone',
            name='currency_name',
            field=models.CharField(default='USD', max_length=20),
        ),
        migrations.AddField(
            model_name='phone',
            name='lineType',
            field=models.CharField(default='unknown', max_length=20),
        ),
        migrations.AddField(
            model_name='phone',
            name='localityLanguage',
            field=models.CharField(default='en', max_length=20),
        ),
        migrations.AlterField(
            model_name='phone',
            name='phone_number',
            field=models.CharField(max_length=15, validators=[django.core.validators.RegexValidator('^\\+?[1-9]\\d{1,14}$')]),
        ),
    ]
