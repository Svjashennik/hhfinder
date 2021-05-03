from hhfind.views import ReqView, Reqfind
from rest_framework.authtoken import views
from django.urls import path
# app_name will help us do a reverse look-up latter.
app_name = 'hhfind'

urlpatterns = [
    path(r'requests/<str:job>/<str:area>/', Reqfind.as_view()),
    path(r'requests/history', ReqView.as_view()),
    
]