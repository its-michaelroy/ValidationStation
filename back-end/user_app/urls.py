from django.urls import path
from .views import Log_in, Info, Log_out, Register

urlpatterns = [
    path('login/', Log_in.as_view(), name='login'),
    path('info/', Info.as_view(), name='info'),
    path('logout/', Log_out.as_view(), name='logout'),
    path('register/', Register.as_view(), name='register'),
]
