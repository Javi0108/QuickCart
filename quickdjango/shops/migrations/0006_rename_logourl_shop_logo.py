# Generated by Django 5.0.3 on 2024-04-01 22:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('shops', '0005_template_shop_template'),
    ]

    operations = [
        migrations.RenameField(
            model_name='shop',
            old_name='logoUrl',
            new_name='logo',
        ),
    ]
