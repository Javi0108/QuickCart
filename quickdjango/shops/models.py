from django.db import models
from accounts.models import Profile

# Create your models here.

class Template(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=255)
    image = models.ImageField(upload_to='template_images')

    def __str__(self):
        return self.name

class Shop(models.Model):
    id_shop = models.AutoField(primary_key=True)
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    shop_name = models.CharField(max_length=100)
    title = models.CharField(max_length=255)
    description = models.CharField(max_length=500, null=True)
    address = models.CharField(max_length=255, null=True)
    logo = models.ImageField(upload_to='shop_logos', null=True, blank=True)
    template = models.ForeignKey(Template, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.shop_name

class Product(models.Model):
    id_product = models.AutoField(primary_key=True)
    shop = models.ForeignKey(Shop, on_delete=models.CASCADE)
    product_name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    stock_quantity = models.IntegerField()
    
    #invoices = models.ManyToManyField(Invoice, through='InvoiceProduct')
    #orders = models.ManyToManyField(Order, through='OrderProduct')


class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='product_images/')