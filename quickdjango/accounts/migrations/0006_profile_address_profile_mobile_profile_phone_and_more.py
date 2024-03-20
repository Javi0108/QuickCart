# Generated by Django 5.0.3 on 2024-03-19 16:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0005_alter_profile_user_type'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='address',
            field=models.CharField(blank=True, max_length=55, null=True),
        ),
        migrations.AddField(
            model_name='profile',
            name='mobile',
            field=models.CharField(blank=True, max_length=20),
        ),
        migrations.AddField(
            model_name='profile',
            name='phone',
            field=models.CharField(max_length=20, null=True),
        ),
        migrations.AddField(
            model_name='profile',
            name='sales',
            field=models.IntegerField(null=True),
        ),
        migrations.AddField(
            model_name='profile',
            name='socials',
            field=models.TextField(null=True),
        ),
    ]