from django.db import models


class FormValue(models.Model):
    participation = models.ForeignKey("Participation", on_delete=models.CASCADE, related_name="form")
    field = models.ForeignKey("Field", on_delete=models.PROTECT)
    value = models.TextField()

    class Meta:
        db_table = "form_values"
        unique_together = ["participation", "field"]
