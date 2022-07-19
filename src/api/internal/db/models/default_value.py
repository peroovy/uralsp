from django.db import models


class DefaultValue(models.Model):
    field = models.ForeignKey("Field", on_delete=models.CASCADE, related_name="default_values")
    value = models.CharField(max_length=255)

    class Meta:
        db_table = "default_values"
