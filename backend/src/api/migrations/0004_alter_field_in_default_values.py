# Generated by Django 4.0.6 on 2022-07-19 07:52

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0003_delete_type_from_competition"),
    ]

    operations = [
        migrations.AlterField(
            model_name="defaultvalue",
            name="field",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, related_name="default_values", to="api.field"
            ),
        ),
    ]
