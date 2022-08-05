from django.db import models


class Permissions(models.IntegerChoices):
    DEFAULT = 0
    TEACHER = 1
    ADMIN = 2
    SUPER_ADMIN = 3


class EducationalInstitution(models.IntegerChoices):
    SCHOOL = 0
    COLLEGE = 1
    UNIVERSITY = 2


class User(models.Model):
    name = models.CharField(max_length=127)
    surname = models.CharField(max_length=127, null=True)
    patronymic = models.CharField(max_length=127, null=True)
    permission = models.IntegerField(choices=Permissions.choices, default=Permissions.DEFAULT)
    email = models.EmailField(unique=True, null=True)
    phone = models.CharField(max_length=15, null=True)
    city = models.CharField(max_length=255, null=True)
    region = models.CharField(max_length=255, null=True)

    institution_type = models.IntegerField(choices=EducationalInstitution.choices, null=True)
    institution_name = models.CharField(max_length=255, null=True)
    institution_faculty = models.CharField(max_length=255, null=True)
    institution_course = models.CharField(max_length=255, null=True)

    vkontakte_id = models.CharField(max_length=255, unique=True, null=True)
    google_id = models.CharField(max_length=255, unique=True, null=True)
    telegram_id = models.CharField(max_length=255, unique=True, null=True)

    class Meta:
        db_table = "users"
