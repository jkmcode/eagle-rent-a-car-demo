# Generated by Django 4.0.1 on 2022-01-14 15:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core_app', '0002_cars'),
    ]

    operations = [
        migrations.AddField(
            model_name='cars',
            name='code_registration',
            field=models.CharField(default=1, max_length=20, unique=True),
            preserve_default=False,
        ),
    ]