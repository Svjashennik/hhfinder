from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

class Req(models.Model):
    job = models.CharField('запрос работы',max_length=255)
    region = models.CharField('запрос региона',max_length=255)
    datereq = models.DateTimeField('дата запроса')
    user = models.ForeignKey(User, on_delete = models.CASCADE)
    rescount = models.IntegerField('Кол-во вакансий',default=0)
    ressalary = models.IntegerField('Средняя зарплата',default=0)

    def __str__(self):
        return f'{self.user} - {self.job}'




