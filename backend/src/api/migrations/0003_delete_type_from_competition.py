# Generated by Django 4.0.6 on 2022-07-15 14:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0002_add_related_form_into_form_value"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="competition",
            name="type",
        ),
    ]
