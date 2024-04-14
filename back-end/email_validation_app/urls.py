from django.urls import path
from .views import EmailValidation, A_email_record
# , A_email_record, All_email_records, Whitelist_email_records, Blacklist_email_records

urlpatterns = [
    path('', EmailValidation.as_view(), name='email_validation'),
    path('single_record/<str:identifier>/', A_email_record.as_view(), name='a_email_record'),
    # path('single_record/<str:identifier>/', A_email_record.as_view(), name='a_email_record'),
    # path('delete/<str:identifier>/', A_email_record.as_view(), name='delete_email_record'),
    # path('update/<str:identifier>/', A_email_record.as_view(), name='update_email_record'),
    # path('all/', All_email_records.as_view(), name='all_email_records'),
    # path('whitelist/', Whitelist_email_records.as_view(), name='whitelist_email_records'),
    # path('blacklist/', Blacklist_email_records.as_view(), name='blacklist_email_records'),

]
