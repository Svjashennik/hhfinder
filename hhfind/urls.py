from hhfind.views import ReqView, Reqfind, AccView
from django.urls import path
# app_name will help us do a reverse look-up latter.
app_name = 'hhfind'

urlpatterns = [
    path(r'requests/<str:job>/<str:area>/<int:user>', Reqfind.as_view()),
    path(r'requests/<int:userid>', ReqView.as_view()),
    path(r'access/<str:log>/<str:pas>', AccView.as_view())
]