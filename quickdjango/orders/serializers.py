from rest_framework import serializers
from .models import Order, OrderProduct
from shops.serializers import ProductSerializer

class OrderProductSerializer(serializers.ModelSerializer):
    product = ProductSerializer()  
    
    class Meta:
        model = OrderProduct
        fields = ['id', 'product', 'quantity']


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['id_order', 'profile', 'order_date', 'status', 'products']