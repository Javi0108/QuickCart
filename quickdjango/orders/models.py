from django.db import models
from django.utils import timezone
from accounts.models import Profile
from shops.models import Product

class Order(models.Model):
    id_order = models.AutoField(primary_key=True)
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    order_date = models.DateTimeField(default=timezone.now)
    status = models.CharField(max_length=20, default='Pending')
    products = models.ManyToManyField(Product, through='OrderProduct')

    def add_product(self, product, quantity=1):
        # Añadir un producto al carrito
        order_product, created = OrderProduct.objects.get_or_create(order=self, product=product)
        if not created:
            order_product.quantity += quantity
            order_product.save()

    def remove_product(self, product):
        # Eliminar un producto del carrito
        OrderProduct.objects.filter(order=self, product=product).delete()

    def clear(self):
        # Limpiar el carrito
        self.products.clear()

    def get_total_price(self):
        # Calcular el precio total del carrito
        return sum(item.get_total_price() for item in self.order_products.all())


class OrderProduct(models.Model):
    order = models.ForeignKey(Order, related_name='order_products', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    def get_total_price(self):
        # Calcular el precio total del ítem
        return self.product.price * self.quantity
