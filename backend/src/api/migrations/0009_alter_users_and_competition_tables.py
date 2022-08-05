# Generated by Django 4.0.7 on 2022-08-05 08:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0008_alter_surname_field_in_users"),
    ]

    operations = [
        migrations.RenameField(
            model_name="competition",
            old_name="end_at",
            new_name="registration_end",
        ),
        migrations.RenameField(
            model_name="competition",
            old_name="registration_before",
            new_name="registration_start",
        ),
        migrations.RenameField(
            model_name="user",
            old_name="school",
            new_name="institution_name",
        ),
        migrations.RemoveField(
            model_name="user",
            name="school_class",
        ),
        migrations.AddField(
            model_name="competition",
            name="link",
            field=models.URLField(null=True),
        ),
        migrations.AddField(
            model_name="user",
            name="institution_course",
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AddField(
            model_name="user",
            name="institution_faculty",
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AddField(
            model_name="user",
            name="institution_type",
            field=models.IntegerField(choices=[(0, "School"), (1, "College"), (2, "University")], null=True),
        ),
    ]
