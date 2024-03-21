from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import Shop
from .serializers import ShopSerializer, ShopDetailSerializer

class CreateShopsView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        serializer = ShopDetailSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(profile=request.user.profile)  # Asignamos el perfil del usuario autenticado a la tienda
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

class DetailShopView(APIView):
    def get(self, request, id_shop):
        try:
            shop = Shop.objects.get(id_shop=id_shop)
            serializer = ShopDetailSerializer(shop)
            return Response(serializer.data, status=200)
        except Shop.DoesNotExist:
            return Response({"message": "Tienda no encontrada"}, status=404)

class ShopView(APIView):
    def get(self, request):
        shops = Shop.objects.all()
        serializer = ShopSerializer(shops, many=True)
        return Response(serializer.data, status=200)

class SellerShopsView(APIView):
    permission_classes=[IsAuthenticated]
    
    def get(self, request):
        profile = request.user.profile
        shops = Shop.objects.filter(profile=profile)
        serializer = ShopSerializer(Shop, many=True)
        return Response(serializer.data, status=200)