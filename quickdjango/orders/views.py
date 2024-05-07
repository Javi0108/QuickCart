from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Order, OrderProduct
from .serializers import OrderSerializer
from rest_framework.permissions import IsAuthenticated

class CartView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        order = Order.objects.filter(profile=request.user.profile, status='cart').first()
        if order:
            serializer = OrderSerializer(order)
            return Response(serializer.data)
        else:
            return Response({'message': 'No items in cart'}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request):
        profile = request.user.profile
        product_id = request.data.get('product_id')
        quantity = request.data.get('quantity', 1)

        if not product_id:
            return Response({'error': 'Product ID is required'}, status=status.HTTP_400_BAD_REQUEST)

        order, created = Order.objects.get_or_create(profile=profile, status='cart')
        product = get_object_or_404(Product, id=product_id)

        order_product, product_created = OrderProduct.objects.get_or_create(order=order, product=product)
        order_product.quantity += int(quantity)
        order_product.save()

        serializer = OrderSerializer(order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def delete(self, request, pk):
        order = get_object_or_404(Order, id=pk, profile=request.user.profile, status='cart')
        product_id = request.data.get('product_id')
        
        if not product_id:
            return Response({'error': 'Product ID is required'}, status=status.HTTP_400_BAD_REQUEST)

        product = get_object_or_404(Product, id=product_id)
        order.products.remove(product)
        
        return Response({'message': 'Product removed from cart'}, status=status.HTTP_204_NO_CONTENT)
