from django.db import models


class RequestValue(models.Model):
    request = models.ForeignKey("Request", on_delete=models.CASCADE, related_name="form_values")
    participant = models.ForeignKey("Participant", on_delete=models.CASCADE)
    form_field = models.ForeignKey("CompetitionField", on_delete=models.CASCADE)
    value = models.CharField(max_length=511)

    class Meta:
        db_table = "requests_values"
        unique_together = ["participant", "form_field"]
