from django.db import models


class Participation(models.Model):
    request = models.ForeignKey("Request", on_delete=models.CASCADE)
    user = models.ForeignKey("User", on_delete=models.CASCADE)

    class Meta:
        db_table = "participants"
        unique_together = ["request", "user"]
