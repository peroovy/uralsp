# Generated by Django 4.0.7 on 2022-09-13 14:26

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Competition",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("name", models.CharField(max_length=255)),
                ("registration_start", models.DateTimeField()),
                ("registration_end", models.DateTimeField()),
                ("started_at", models.DateTimeField()),
                ("persons_amount", models.IntegerField(validators=[django.core.validators.MinValueValidator(1)])),
                ("request_template", models.TextField(null=True)),
                ("link", models.URLField(null=True)),
            ],
            options={
                "db_table": "competitions",
            },
        ),
        migrations.CreateModel(
            name="Field",
            fields=[
                ("id", models.CharField(max_length=127, primary_key=True, serialize=False)),
                ("name", models.CharField(max_length=127)),
                ("type", models.IntegerField()),
                ("is_required", models.BooleanField(default=True)),
                ("is_visible", models.BooleanField(default=True)),
            ],
            options={
                "db_table": "fields",
            },
        ),
        migrations.CreateModel(
            name="Participation",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
            ],
            options={
                "db_table": "participants",
            },
        ),
        migrations.CreateModel(
            name="User",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("name", models.CharField(max_length=127)),
                ("surname", models.CharField(max_length=127, null=True)),
                ("patronymic", models.CharField(max_length=127, null=True)),
                (
                    "permission",
                    models.CharField(
                        choices=[
                            ("default", "Default"),
                            ("teacher", "Teacher"),
                            ("admin", "Admin"),
                            ("super_admin", "Super Admin"),
                        ],
                        default="default",
                        max_length=31,
                    ),
                ),
                ("email", models.EmailField(max_length=254, null=True, unique=True)),
                ("phone", models.CharField(max_length=15, null=True)),
                ("city", models.CharField(max_length=255, null=True)),
                ("region", models.CharField(max_length=255, null=True)),
                (
                    "institution_type",
                    models.CharField(
                        choices=[("school", "School"), ("college", "College"), ("university", "University")],
                        max_length=31,
                        null=True,
                    ),
                ),
                ("institution_name", models.CharField(max_length=255, null=True)),
                ("institution_faculty", models.CharField(max_length=255, null=True)),
                ("institution_course", models.CharField(max_length=255, null=True)),
                ("vkontakte_id", models.CharField(max_length=255, null=True, unique=True)),
                ("google_id", models.CharField(max_length=255, null=True, unique=True)),
                ("telegram_id", models.CharField(max_length=255, null=True, unique=True)),
            ],
            options={
                "db_table": "users",
            },
        ),
        migrations.CreateModel(
            name="Request",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("team_name", models.CharField(max_length=255)),
                (
                    "status",
                    models.CharField(
                        choices=[
                            ("awaited", "Awaited"),
                            ("accepted", "Accepted"),
                            ("rejected", "Rejected"),
                            ("canceled", "Canceled"),
                        ],
                        default="awaited",
                        max_length=31,
                    ),
                ),
                ("description", models.CharField(max_length=255, null=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                (
                    "competition",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, related_name="requests", to="api.competition"
                    ),
                ),
                (
                    "owner",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, related_name="created_requests", to="api.user"
                    ),
                ),
                ("participants", models.ManyToManyField(through="api.Participation", to="api.user")),
            ],
            options={
                "db_table": "requests",
            },
        ),
        migrations.CreateModel(
            name="RefreshToken",
            fields=[
                ("value", models.CharField(max_length=255, primary_key=True, serialize=False)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("revoked", models.BooleanField(default=False)),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, related_name="refresh_tokens", to="api.user"
                    ),
                ),
            ],
            options={
                "db_table": "refresh_tokens",
            },
        ),
        migrations.AddField(
            model_name="participation",
            name="request",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, related_name="participation", to="api.request"
            ),
        ),
        migrations.AddField(
            model_name="participation",
            name="user",
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to="api.user"),
        ),
        migrations.CreateModel(
            name="DefaultValue",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("value", models.CharField(max_length=255)),
                (
                    "field",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, related_name="default_values", to="api.field"
                    ),
                ),
            ],
            options={
                "db_table": "default_values",
            },
        ),
        migrations.AddField(
            model_name="competition",
            name="admins",
            field=models.ManyToManyField(related_name="administered_competitions", to="api.user"),
        ),
        migrations.AddField(
            model_name="competition",
            name="fields",
            field=models.ManyToManyField(related_name="competitions", to="api.field"),
        ),
        migrations.AlterUniqueTogether(
            name="participation",
            unique_together={("request", "user")},
        ),
        migrations.CreateModel(
            name="FormValue",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("value", models.TextField()),
                ("field", models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to="api.field")),
                (
                    "participation",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, related_name="form", to="api.participation"
                    ),
                ),
            ],
            options={
                "db_table": "form_values",
                "unique_together": {("participation", "field")},
            },
        ),
    ]
