# Generated by Django 5.0.3 on 2024-03-18 21:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0003_remove_profile_type_profile_user_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='user_type',
            field=models.CharField(choices=[('Cliente', 'Cliente'), ('Empresa', 'Empresa')], default='Cliente', max_length=10),
        ),
    ]