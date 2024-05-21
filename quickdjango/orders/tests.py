from django.test import TestCase
from django.contrib.auth.models import User
from django.utils import timezone
from accounts.models import Profile
from shops.models import Product
from .models import Order, OrderProduct


class OrderViewTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="test_user")
        self.profile = Profile.objects.create(user=self.user)
        self.product = Product.objects.create(
            name="Test Product", price=10, stock_quantity=10
        )

    def test_get_order(self):
        order = Order.objects.create(profile=self.profile)
        order_product = OrderProduct.objects.create(
            order=order, product=self.product, quantity=1
        )
        response = self.client.get(f"/orders/{order.id}/")
        self.assertEqual(response.status_code, 200)

    def test_post_order(self):
        data = {
            "profile": self.profile.id,
            "order_date": timezone.now(),
            "status": "Pending",
            "total_price": 10,  # Asegúrate de que total_price tenga un valor válido
        }
        response = self.client.post("/orders/", data)
        self.assertEqual(response.status_code, 201)

    def test_put_order(self):
        order = Order.objects.create(profile=self.profile)
        data = {
            "profile": self.profile.id,
            "order_date": timezone.now(),
            "status": "Pending",
            "total_price": 10,  # Asegúrate de que total_price tenga un valor válido
        }
        response = self.client.put(f"/orders/{order.id}/", data)
        self.assertEqual(response.status_code, 200)

    def test_delete_order(self):
        order = Order.objects.create(profile=self.profile)
        response = self.client.delete(f"/orders/{order.id}/")
        self.assertEqual(response.status_code, 204)
