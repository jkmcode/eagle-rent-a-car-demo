# Generated by Django 4.0.1 on 2022-02-03 16:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core_app', '0015_rename_typ_change_cars_reservation_type_change'),
    ]

    operations = [
        migrations.AddField(
            model_name='locations',
            name='supp_unique_var',
            field=models.ImageField(blank=True, null=True, unique=True, upload_to=''),
        ),
    ]