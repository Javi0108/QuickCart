from django.db import models
from django.utils import timezone
from accounts.models import Profile
from shops.models import Product

class Order(models.Model):
    id_order = models.AutoField(primary_key=True)
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    order_date = models.DateTimeField(default=timezone.now)
    status = models.CharField(max_length=20, default='Pending')

    def add_product(self, product, quantity=1):
        order_product, created = OrderProduct.objects.get_or_create(order=self, product=product)
        if not created:
            order_product.quantity += quantity
            order_product.save()

    def remove_product(self, product):
        try:
            order_product = OrderProduct.objects.get(order=self, product=product)
            order_product.delete()
        except OrderProduct.DoesNotExist:
            pass
    
    def update_product_quantity(self, product, new_quantity):
        try:
            order_product = OrderProduct.objects.get(order=self, product=product)
            order_product.quantity = new_quantity
            order_product.save()
        except OrderProduct.DoesNotExist:
            pass

class OrderProduct(models.Model):
    order = models.ForeignKey(Order, related_name='order_products', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    def get_total_price(self):
        return self.product.price * self.quantity