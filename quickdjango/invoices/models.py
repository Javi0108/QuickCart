from django.db import models
from orders.models import Order
from accounts.models import Profile
from shops.models import Product

# Create your models here.


class Invoice(models.Model):
    id_invoice = models.AutoField(primary_key=True)
    order = models.OneToOneField(Order, on_delete=models.CASCADE)
    invoice_date = models.DateTimeField()
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
