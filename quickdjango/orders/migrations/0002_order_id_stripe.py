# Generated by Django 4.1.13 on 2024-05-07 11:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='id_stripe',
            field=models.CharField(default=None, max_length=250),
        ),
    ]
