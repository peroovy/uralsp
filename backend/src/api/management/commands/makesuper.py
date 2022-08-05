from django.apps import apps
from django.core.management.base import BaseCommand

from api.internal.db.models.user import Permissions

User = apps.get_model("api", "User")


class Command(BaseCommand):
    def add_arguments(self, parser):
        parser.add_argument("user_id", type=int)

    def handle(self, *args, **kwargs):
        User.objects.filter(id=kwargs["user_id"]).update(permission=Permissions.SUPER_ADMIN)
