from django.urls import path
from .views import PhoneValidation, A_phone_record, All_phone_records, Whitelist_phone_records, Blacklist_phone_records

urlpatterns = [
    path('', PhoneValidation.as_view(), name='phone_validation'),
    path('single_record/<str:identifier>/', A_phone_record.as_view(), name='a_phone_record'),
    path('delete/<str:identifier>/', A_phone_record.as_view(), name='delete_phone_record'),
    path('update/<str:identifier>/', A_phone_record.as_view(), name='update_phone_record'),
    path('all/', All_phone_records.as_view(), name='all_phone_records'),
    path('whitelist/', Whitelist_phone_records.as_view(), name='whitelist_phone_records'),
    path('blacklist/', Blacklist_phone_records.as_view(), name='blacklist_phone_records'),

]
