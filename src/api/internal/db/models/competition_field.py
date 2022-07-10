from django.db import models


class CompetitionField(models.Model):
    competition = models.ForeignKey("Competition", on_delete=models.CASCADE, related_name="fields")
    field = models.ForeignKey("Field", on_delete=models.CASCADE)
    is_required = models.BooleanField(default=True)
    is_visible = models.BooleanField(default=True)

    class Meta:
        db_table = "competitions_fields"
