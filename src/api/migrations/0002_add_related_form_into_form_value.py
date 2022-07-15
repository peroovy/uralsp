# Generated by Django 4.0.6 on 2022-07-15 11:18

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0001_init"),
    ]

    operations = [
        migrations.AlterField(
            model_name="formvalue",
            name="participation",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, related_name="form", to="api.participation"
            ),
        ),
    ]
