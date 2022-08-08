from django.db import migrations, models
from django.db.models import F, Value as V


def transform_user(apps, schema_editor):
    User = apps.get_model("api", "User")
    User.objects.update(
        permission=models.Case(
            models.When(permission="0", then=V("default")),
            models.When(permission="1", then=V("teacher")),
            models.When(permission="2", then=V("admin")),
            models.When(permission="3", then=V("super_admin")),
        ),
        institution_type=models.Case(
            models.When(institution_type="0", then=V("school")),
            models.When(institution_type="1", then=V("college")),
            models.When(institution_type="2", then=V("university")),
        ),
    )


def reverse_user(apps, schema_editor):
    User = apps.get_model("api", "User")
    User.objects.update(
        permission=models.Case(
            models.When(permission="default", then=V(0)),
            models.When(permission="teacher", then=V(1)),
            models.When(permission="admin", then=V(2)),
            models.When(permission="super_admin", then=V(3)),
        )
    )


def transform_request(apps, schema_editor):
    Request = apps.get_model("api", "Request")
    Request.objects.update(
        status=models.Case(
            models.When(status="0", then=V("awaited")),
            models.When(status="1", then=V("accepted")),
            models.When(status="2", then=V("rejected")),
            models.When(status="3", then=V("canceled")),
        )
    )


def reverse_request(apps, schema_editor):
    Request = apps.get_model("api", "Request")
    Request.objects.update(
        status=models.Case(
            models.When(status="awaited", then=V(0)),
            models.When(status="accepted", then=V(1)),
            models.When(status="rejected", then=V(2)),
            models.When(status="canceled", then=V(3)),
        )
    )


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0011_alter_choices"),
    ]

    operations = [
        migrations.RunPython(transform_request, reverse_request),
        migrations.RunPython(transform_user, reverse_user),
    ]
