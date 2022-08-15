from django.core.validators import MinValueValidator
from django.db import models


class Competition(models.Model):
    name = models.CharField(max_length=255)
    registration_start = models.DateTimeField()
    registration_end = models.DateTimeField()
    started_at = models.DateTimeField()
    persons_amount = models.IntegerField(validators=[MinValueValidator(1)])
    request_template = models.TextField(null=True)
    link = models.URLField(null=True)
    fields = models.ManyToManyField("Field", related_name="competitions")
    admins = models.ManyToManyField("User", related_name="administered_competitions")

    class Meta:
        db_table = "competitions"
