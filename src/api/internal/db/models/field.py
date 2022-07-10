from django.db import models


class Field(models.Model):
    class Type(models.IntegerChoices):
        TEXT = 0
        LIST = 1
        CHECKBOX = 2
        DATE = 3
        FILE = 4

    id = models.CharField(max_length=127, primary_key=True)
    name = models.CharField(max_length=127)
    type = models.IntegerField(choices=Type.choices)

    class Meta:
        db_table = "fields"
        verbose_name = "Field"
        verbose_name_plural = "Fields"
