from django.db import models


class Permissions(models.IntegerChoices):
    DEFAULT = 0
    TEACHER = 1
    ADMIN = 2
    SUPER_ADMIN = 3


class User(models.Model):
    name = models.CharField(max_length=127)
    surname = models.CharField(max_length=127)
    patronymic = models.CharField(max_length=127, null=True)
    permission = models.IntegerField(choices=Permissions.choices, default=Permissions.DEFAULT)
    email = models.EmailField(unique=True, null=True)
    phone = models.CharField(max_length=15, null=True)
    city = models.CharField(max_length=255, null=True)
    region = models.CharField(max_length=255, null=True)
    school = models.CharField(max_length=255, null=True)
    school_class = models.CharField(max_length=15, null=True)
    vkontakte_id = models.CharField(max_length=255, unique=True, null=True)
    google_id = models.CharField(max_length=255, unique=True, null=True)
    telegram_id = models.CharField(max_length=255, unique=True, null=True)

    class Meta:
        db_table = "users"
