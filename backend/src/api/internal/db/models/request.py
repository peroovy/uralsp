from django.db import models


class RequestStatus(models.TextChoices):
    AWAITED = "awaited"
    ACCEPTED = "accepted"
    REJECTED = "rejected"
    CANCELED = "canceled"


class Request(models.Model):
    owner = models.ForeignKey("User", on_delete=models.CASCADE, related_name="created_requests")
    competition = models.ForeignKey("Competition", on_delete=models.CASCADE, related_name="requests")
    team_name = models.CharField(max_length=255)
    status = models.CharField(max_length=31, choices=RequestStatus.choices, default=RequestStatus.AWAITED)
    description = models.CharField(max_length=255, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    participants = models.ManyToManyField("User", through="Participation")

    class Meta:
        db_table = "requests"
