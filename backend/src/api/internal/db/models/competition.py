from django.core.validators import MinValueValidator
from django.db import models


class Competition(models.Model):
    name = models.CharField(max_length=255)
    started_at = models.DateTimeField()
    registration_before = models.DateTimeField()
    end_at = models.DateTimeField()
    person_amount = models.IntegerField(validators=[MinValueValidator(1)])
    fields = models.ManyToManyField("Field")

    class Meta:
        db_table = "competitions"
