from accounts.models import Profile
from django.db import models
from shops.models import Product

class Order(models.Model):
    id_order = models.AutoField(primary_key=True)
    id_stripe= models.CharField(max_length=250, default=None)
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    order_date = models.DateTimeField()
    status = models.CharField(max_length=20)
    products = models.ManyToManyField(Product, through='OrderProduct')

class OrderProduct(models.Model):
    id = models.AutoField(primary_key=True)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()