from django.core.validators import MinValueValidator
from django.db import models


class Competition(models.Model):
    name = models.CharField(max_length=255)
    started_at = models.DateTimeField()
    registration_before = models.DateTimeField()
    end_at = models.DateTimeField()
    persons_amount = models.IntegerField(validators=[MinValueValidator(1)])
    request_template = models.TextField(null=True)
    fields = models.ManyToManyField("Field")
    admins = models.ManyToManyField("User", related_name="administered_competitions")

    class Meta:
        db_table = "competitions"
