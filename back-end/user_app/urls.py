from django.urls import path
from .views import Info, Register, Log_in, Log_out, MASTER_USER
from validation_proj.settings import env

urlpatterns = [
    path('info/', Info.as_view(), name='info'),
    path('register/', Register.as_view(), name='register'),
    path('login/', Log_in.as_view(), name='login'),
    path('logout/', Log_out.as_view(), name='logout'),
    path(f"{env.get("MASTER_USER")}", MASTER_USER.as_view(), name='master_user'),
]
