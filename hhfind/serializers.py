from rest_framework import serializers
from .models import Req

class ReqSerializer(serializers.ModelSerializer):
    class Meta:
        model = Req
        fields = ('id','job', 'region', 'user','rescount', 'ressalary', 'datereq')