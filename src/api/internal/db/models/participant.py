from django.db import models


class Participant(models.Model):
    request = models.ForeignKey("Request", on_delete=models.CASCADE)
    user = models.ForeignKey("User", on_delete=models.CASCADE)

    class Meta:
        db_table = "participants"
        verbose_name = "Participant"
        verbose_name_plural = "Participants"
