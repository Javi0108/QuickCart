from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Order, OrderProduct
from .serializers import OrderSerializer
from shops.models import Product

#### Stripe
import stripe
from django.conf import settings
from django.http import JsonResponse


class OrderView(APIView):
    http_methods = ["get", "put", "post", "delete"]

    def get(self, request, order_id=None):
        if order_id is not None:
            order = get_object_or_404(Order, id_order=order_id)
            serializer = OrderSerializer(order)
            return Response(serializer.data)
        else:
            return Response(
                {"message": "Order ID is required"}, status=status.HTTP_400_BAD_REQUEST
            )

    def post(self, request):
        product_id = request.data.get("product_id")
        quantity = request.data.get("quantity", 1)

        if not product_id:
            return Response(
                {"error": "Product ID is required"}, status=status.HTTP_400_BAD_REQUEST
            )

        profile = request.user.profile
        product = get_object_or_404(Product, id_product=product_id)

        order, created = Order.objects.get_or_create(profile=profile, status="Pending")
        order.add_product(product, quantity=quantity)

        serializer = OrderSerializer(order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def put(self, request, pk):
        order = get_object_or_404(
            Order, id_order=pk, profile=request.user.profile, status="Pending"
        )
        product_id = request.data.get("product_id")
        quantity = request.data.get("quantity")

        if not product_id or not quantity:
            return Response(
                {"error": "Product ID and quantity are required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        product = get_object_or_404(Product, id_product=product_id)
        order.update_product_quantity(product, quantity)

        serializer = OrderSerializer(order)
        return Response(serializer.data)

    def delete(self, request, pk):
        order = get_object_or_404(
            Order, id_order=pk, profile=request.user.profile, status="Pending"
        )
        product_id = request.query_params.get("product_id")

        if not product_id:
            return Response(
                {"error": "Product ID is required"}, status=status.HTTP_400_BAD_REQUEST
            )

        product = get_object_or_404(Product, id_product=product_id)
        order.remove_product(product)

        return Response(
            {"message": "Product removed from cart"}, status=status.HTTP_204_NO_CONTENT
        )


class CheckoutSessionView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            order_id = request.data.get("order_id")
            print(order_id)
            order = Order.objects.get(id_order=order_id)
            session_data = {
                "mode": "payment",
                "success_url": f"http://localhost:8100/success/{order_id}",
                "cancel_url": f"http://localhost:8100/cancel/{order_id}",
                "line_items": [],
                #                "automatic_tax": {"enabled": True},
                "client_reference_id": str(order.id_order),
            }

            items = request.data.get("items")
            for item in items:
                session_data["line_items"].append(
                    {
                        "price_data": {
                            "currency": "eur",
                            "product_data": {
                                "name": item["product"]["name"],
                                "images": (
                                    f"http://127.0.0.1:8000{item['product']['avatar']}",
                                ),
                            },
                            "unit_amount": int(float(item["product"]["price"]) * 100),
                        },
                        "quantity": item["quantity"],
                    }
                )

            checkout_session = stripe.checkout.Session.create(**session_data)
            print("AAA")
            return Response({"url": checkout_session.url}, status=200)
        except Order.DoesNotExist:
            return Response({"error": "Order not found."}, status=404)
        except Exception as e:
            # Log the exception for further investigation
            print(f"Error: {e}")  # Debug: Print the actual error message
            return Response({"error": str(e)}, status=400)
