# Generated by Django 4.1.13 on 2024-04-28 22:16

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id_profile', models.AutoField(primary_key=True, serialize=False)),
                ('phone', models.CharField(max_length=20, null=True)),
                ('mobile', models.CharField(blank=True, max_length=20)),
                ('address', models.CharField(blank=True, max_length=55, null=True)),
                ('avatar', models.ImageField(blank=True, null=True, upload_to='avatar/')),
                ('sales', models.IntegerField(null=True)),
                ('socials', models.JSONField(default=dict)),
                ('user_type', models.CharField(choices=[('Client', 'Client'), ('Seller', 'Seller')], default='Client', max_length=10)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
