# Generated by Django 4.1.13 on 2024-04-24 20:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shops', '0012_alter_product_avatar_alter_product_images_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='avatar',
            field=models.ImageField(default='default_avatar.jpg', upload_to='product_images/'),
        ),
    ]
