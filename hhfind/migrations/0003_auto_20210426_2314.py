# Generated by Django 3.2 on 2021-04-26 20:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hhfind', '0002_rename_requst_request'),
    ]

    operations = [
        migrations.AddField(
            model_name='request',
            name='rescount',
            field=models.IntegerField(default=0, verbose_name='Кол-во вакансий'),
        ),
        migrations.AddField(
            model_name='request',
            name='ressalary',
            field=models.IntegerField(default=0, verbose_name='Средняя зарплата'),
        ),
    ]
