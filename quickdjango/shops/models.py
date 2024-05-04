from django.db import models
from accounts.models import Profile

# Create your models here.

class Shop(models.Model):
    id_shop = models.AutoField(primary_key=True)
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    title = models.CharField(max_length=255)
    description = models.CharField(max_length=500, null=True)
    address = models.CharField(max_length=255, null=True)
    logo = models.ImageField(upload_to='shop_logos', null=True, blank=True)
    
    def __str__(self):
        return self.name
    
class Section(models.Model):
    type = models.CharField(max_length=100)
    data = models.JSONField(default=dict)

class ShopSectionOrder(models.Model):
    section = models.ForeignKey(Section, on_delete=models.CASCADE)
    order = models.IntegerField(default=0)
    shop = models.ForeignKey(Shop, on_delete=models.CASCADE)

    class Meta:
        ordering = ['order'] 

    

class Product(models.Model):
    id_product = models.AutoField(primary_key=True)
    shop = models.ForeignKey(Shop, on_delete=models.CASCADE)
    
    name = models.CharField(max_length=100)
    brand = models.CharField(max_length=100, null=True)
    short_description = models.CharField(max_length=255, null=True)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    avatar = models.ImageField(upload_to='product_images/', default='default_avatar.jpg')
    stock_quantity = models.IntegerField()
    images = models.ManyToManyField('ProductImage', related_name='product_images',blank=True)
    tags = models.ManyToManyField('Tag',blank=True)
        
    #invoices = models.ManyToManyField(Invoice, through='InvoiceProduct')
    #orders = models.ManyToManyField(Order, through='OrderProduct')
    
class ProductImage(models.Model):
    image = models.ImageField(upload_to='product_images/')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='product_images')

    def __str__(self):
        return f"{self.product.name} - {self.id}"

class Tag(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

