from django.db import models


class User(models.Model):
    class Permissions(models.IntegerChoices):
        DEFAULT = 0
        TEACHER = 1
        ADMIN = 2
        SUPER_ADMIN = 3

    name = models.CharField(max_length=127)
    surname = models.CharField(max_length=127)
    patronymic = models.CharField(max_length=127)
    permission = models.IntegerField(choices=Permissions.choices, default=Permissions.DEFAULT)
    email = models.EmailField(unique=True, null=True)
    phone = models.CharField(max_length=15, unique=True, null=True)
    region = models.CharField(max_length=255, null=True)
    school = models.CharField(max_length=255, null=True)
    school_class = models.CharField(max_length=15, null=True)

    class Meta:
        db_table = "users"
        verbose_name = "User"
        verbose_name_plural = "Users"
