from django.db import models


class Request(models.Model):
    class Status(models.IntegerChoices):
        AWAITED = 0
        ACCEPTED = 1
        REJECTED = 2

    owner = models.ForeignKey("User", on_delete=models.CASCADE, related_name="created_requests")
    competition = models.ForeignKey("Competition", on_delete=models.CASCADE, related_name="requests")
    team_name = models.CharField(max_length=255)
    participants = models.ManyToManyField("User", through="Participant")
    status = models.IntegerField(choices=Status.choices, default=Status.AWAITED)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "requests"
        verbose_name = "Request"
        verbose_name_plural = "Requests"
