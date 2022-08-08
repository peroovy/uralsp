from django.db import models


class Permissions(models.TextChoices):
    DEFAULT = "default"
    TEACHER = "teacher"
    ADMIN = "admin"
    SUPER_ADMIN = "super_admin"


class Institution(models.TextChoices):
    SCHOOL = "school"
    COLLEGE = "college"
    UNIVERSITY = "university"


class User(models.Model):
    name = models.CharField(max_length=127)
    surname = models.CharField(max_length=127, null=True)
    patronymic = models.CharField(max_length=127, null=True)
    permission = models.CharField(max_length=31, choices=Permissions.choices, default=Permissions.DEFAULT)
    email = models.EmailField(unique=True, null=True)
    phone = models.CharField(max_length=15, null=True)
    city = models.CharField(max_length=255, null=True)
    region = models.CharField(max_length=255, null=True)

    institution_type = models.CharField(max_length=31, choices=Institution.choices, null=True)
    institution_name = models.CharField(max_length=255, null=True)
    institution_faculty = models.CharField(max_length=255, null=True)
    institution_course = models.CharField(max_length=255, null=True)

    vkontakte_id = models.CharField(max_length=255, unique=True, null=True)
    google_id = models.CharField(max_length=255, unique=True, null=True)
    telegram_id = models.CharField(max_length=255, unique=True, null=True)

    class Meta:
        db_table = "users"
