# Generated by Django 4.0.1 on 2022-01-27 08:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core_app', '0010_cars_reservation'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='cars_reservation',
            name='hour_from',
        ),
        migrations.RemoveField(
            model_name='cars_reservation',
            name='hour_to',
        ),
    ]