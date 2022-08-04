from django.db import models


class Field(models.Model):
    id = models.CharField(max_length=127, primary_key=True)
    name = models.CharField(max_length=127)
    type = models.IntegerField()
    is_required = models.BooleanField(default=True)
    is_visible = models.BooleanField(default=True)

    class Meta:
        db_table = "fields"
