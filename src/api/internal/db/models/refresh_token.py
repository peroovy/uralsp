from django.db import models


class RefreshToken(models.Model):
    value = models.CharField(max_length=255, primary_key=True)
    user = models.ForeignKey("User", on_delete=models.CASCADE, related_name="refresh_tokens")
    created_at = models.DateTimeField(auto_now_add=True)
    revoked = models.BooleanField(default=False)

    class Meta:
        db_table = "refresh_tokens"
        verbose_name = "Refresh Token"
        verbose_name_plural = "Refresh Tokens"
