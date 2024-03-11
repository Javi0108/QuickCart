from django.db import models
from accounts.models import Profile

# Create your models here.

class Shop(models.Model):
    id_shop = models.AutoField(primary_key=True)
    profile = models.OneToOneField(Profile, on_delete=models.CASCADE)
    shop_name = models.CharField(max_length=100)
    location = models.CharField(max_length=255)

class Product(models.Model):
    id_product = models.AutoField(primary_key=True)
    shop = models.ForeignKey(Shop, on_delete=models.CASCADE)
    product_name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    stock_quantity = models.IntegerField()
    #invoices = models.ManyToManyField(Invoice, through='InvoiceProduct')
    #orders = models.ManyToManyField(Order, through='OrderProduct')
