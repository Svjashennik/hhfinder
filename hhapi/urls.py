
from django.contrib import admin
from django.urls import path,include
from rest_framework.authtoken import views

# app_name will help us do a reverse look-up latter.


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('hhfind.urls')),
    path('api-token-auth/', views.obtain_auth_token),
]
