from django.urls import path
from .views import Icon_isValid, Icon_notValid

urlpatterns = [
    path('isValid/', Icon_isValid.as_view(), name='icon_is_valid'),
    path('notValid/', Icon_notValid.as_view(), name='icon_not_valid'),

]
