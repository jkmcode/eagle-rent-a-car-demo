# Generated by Django 4.0.1 on 2022-02-03 17:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core_app', '0016_locations_supp_unique_var'),
    ]

    operations = [
        migrations.AlterField(
            model_name='locations',
            name='supp_unique_var',
            field=models.IntegerField(blank=True, null=True, unique=True),
        ),
    ]
