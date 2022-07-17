from django.db import models


class FieldTypes(models.IntegerChoices):
    TEXT = 0
    LIST = 1
    CHECKBOX = 2
    DATE = 3
    FILE = 4


class Field(models.Model):
    id = models.CharField(max_length=127, primary_key=True)
    name = models.CharField(max_length=127)
    type = models.IntegerField(choices=FieldTypes.choices)
    is_required = models.BooleanField(default=True)
    is_visible = models.BooleanField(default=True)

    class Meta:
        db_table = "fields"
