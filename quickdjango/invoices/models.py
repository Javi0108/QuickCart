from django.db import models
from orders.models import Order
from accounts.models import Profile
from shops.models import Product

# Create your models here.

class Invoice(models.Model):
    id_invoice = models.AutoField(primary_key=True)
    order = models.OneToOneField(Order, on_delete=models.CASCADE)
    profile = models.OneToOneField(Profile, on_delete=models.CASCADE)
    invoice_date = models.DateTimeField()
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    products = models.ManyToManyField(Product, through='InvoiceProduct')

class InvoiceProduct(models.Model):
    id = models.AutoField(primary_key=True)
    invoice = models.ForeignKey(Invoice, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()