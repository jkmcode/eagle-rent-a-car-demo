# Generated by Django 4.0.1 on 2022-02-04 13:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core_app', '0017_alter_locations_supp_unique_var'),
    ]

    operations = [
        migrations.AlterField(
            model_name='locations',
            name='name',
            field=models.CharField(max_length=255, unique=True),
        ),
    ]
