from django.apps import apps
from django.core.management.base import BaseCommand

from api.internal.auth.domain.services import jwt_service

User = apps.get_model("api", "User")


class Command(BaseCommand):
    def add_arguments(self, parser):
        parser.add_argument("user_id", type=int)

    def handle(self, *args, **kwargs):
        user = User.objects.get(id=kwargs["user_id"])
        details = jwt_service.create_access_and_refresh_tokens(user)

        print(details.access)
