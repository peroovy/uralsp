# Generated by Django 4.0.6 on 2022-07-22 18:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0004_alter_field_in_default_values"),
    ]

    operations = [
        migrations.RenameField(
            model_name="competition",
            old_name="person_amount",
            new_name="persons_amount",
        ),
        migrations.AddField(
            model_name="competition",
            name="admins",
            field=models.ManyToManyField(related_name="administered_competitions", to="api.user"),
        ),
        migrations.AddField(
            model_name="competition",
            name="request_template",
            field=models.TextField(null=True),
        ),
    ]
