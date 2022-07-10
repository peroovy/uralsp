from django.core.validators import MinValueValidator
from django.db import models


class Competition(models.Model):
    class Type(models.IntegerChoices):
        PERSONAL = 0
        TEAM = 1

    name = models.CharField(max_length=255)
    started_at = models.DateTimeField()
    registration_before = models.DateTimeField()
    type = models.IntegerField(choices=Type.choices)
    person_amount = models.IntegerField(validators=[MinValueValidator(1)])

    class Meta:
        db_table = "competitions"
        verbose_name = "Competition"
        verbose_name_plural = "Competitions"
