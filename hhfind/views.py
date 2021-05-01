from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Req, User
from .serializers import ReqSerializer
import requests
from django.utils import timezone
from django.core.mail import send_mail
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token

class ReqView(APIView):
    permission_classes = (IsAuthenticated,)  
    def get(self, request, userid):
        us = User.objects.get(pk=userid)
        his = us.req_set.all()
        serializer = ReqSerializer(his, many=True)
        who = us.email
        message = f'История запросов пользователя {us.username} - {serializer.data}'
        from_email='finder00@internet.ru'
        send_mail('История запросов', message, from_email, [who])
        return Response(True)

class Reqfind(APIView):
    permission_classes = (IsAuthenticated,)  
    def get(self, request, job=None, area=None, user=None):
        data = {'count':0, 'sal':0}
        users = User.objects.get(pk=user)
        reg = requests.get(' https://api.hh.ru/suggests/areas', params={'text':area}).json()
        if len(reg['items'])==0:
            Reqfind.SaveReq(job, area, users, data['count'], data['sal'])
            return Response({"req": data})
        reg = reg['items'][0]['id']
        payload = {'text': job, "area": reg, 'per_page':100, 'only_with_salary':True}  
        r = requests.get(' https://api.hh.ru/vacancies/', params=payload)
        l = r.json()
        data['count']=l['found']
        sumsal = 0
        for vac in l['items']:
            if vac['salary']['from'] != None and vac['salary']['to'] != None:
                sumsal+= (vac['salary']['from']+vac['salary']['to'])/2
            elif vac['salary']['from'] != None:
                sumsal+= vac['salary']['from']
            elif vac['salary']['to'] != None:
                sumsal+= vac['salary']['to']
        
        if data['count']!=0:
            data['sal'] = sumsal/data['count']
        Reqfind.SaveReq(job, area, users, data['count'], data['sal'])
        return Response({"req": data})
    
    @staticmethod
    def SaveReq(job, region, user, rescount, ressalary):
        Req(job=job, region=region, datereq=timezone.now(), user=user, rescount=rescount, ressalary=ressalary).save()


class CustomAuthToken(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'email': user.email
        })