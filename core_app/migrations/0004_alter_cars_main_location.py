# Generated by Django 4.0.1 on 2022-01-17 15:57

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core_app', '0003_cars_code_registration'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cars',
            name='main_location',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='core_app.locations'),
        ),
    ]
