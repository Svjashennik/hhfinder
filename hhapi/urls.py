from hhfind.views import CustomAuthToken
from django.contrib import admin
from django.urls import path,include

# app_name will help us do a reverse look-up latter.


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('hhfind.urls')),
    path('api-token-auth/', CustomAuthToken.as_view()),
    path('',include('front.urls'))
]
