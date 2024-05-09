from django.db import models
from django.utils import timezone
from accounts.models import Profile
from shops.models import Product
from django.db.models import F, Sum


class Order(models.Model):
    id_order = models.AutoField(primary_key=True)
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    order_date = models.DateTimeField(default=timezone.now)
    status = models.CharField(max_length=20, default='Pending')
    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    def add_product(self, product, quantity=1):
        order_product, created = OrderProduct.objects.get_or_create(order=self, product=product)
        if not created:
            order_product.quantity += quantity
            order_product.save()
        self.total_price += product.price * quantity
        self.save()

    def remove_product(self, product):
        try:
            order_product = OrderProduct.objects.get(order=self, product=product)
            order_product.delete()
            self.update_total_price()
        except OrderProduct.DoesNotExist:
            pass
    
    def update_product_quantity(self, product, new_quantity):
        try:
            order_product = OrderProduct.objects.get(order=self, product=product)
            order_product.quantity = new_quantity
            order_product.save()
            self.update_total_price()
        except OrderProduct.DoesNotExist:
            pass

    def update_total_price(self):
        total_price = self.order_products.aggregate(total=Sum(F('quantity') * F('product__price')))['total']
        self.total_price = total_price or 0
        self.save()


class OrderProduct(models.Model):
    order = models.ForeignKey(Order, related_name='order_products', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    def get_total_price(self):
        return self.product.price * self.quantity