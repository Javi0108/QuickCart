from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import Shop
from .serializers import ShopSerializer, ShopDetailSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import ShopSerializer  # Importa tu serializador de tienda aquí
from django.shortcuts import get_object_or_404

class CreateShopsView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        profile = request.user.profile
        request_data = request.data.copy() 
        request_data['profile'] = profile.id_profile 
        serializer = ShopSerializer(data=request_data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        else:
            return Response(serializer.errors, status=400)


class DetailShopView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, id_shop):
        try:
            shop = Shop.objects.get(id_shop=id_shop)
            serializer = ShopDetailSerializer(shop)
            return Response(serializer.data, status=200)
        except Shop.DoesNotExist:
            return Response({"message": "Tienda no encontrada"}, status=404)
        
    def delete(self, request, id_shop):
        shop = get_object_or_404(Shop, id=id_shop)
        shop.delete()
        return Response({'message': 'Shop deleted successfully'}, status=204)

class ShopView(APIView):
    permission_classes = [IsAuthenticated]    

    def get(self, request):
        shops = Shop.objects.all()
        serializer = ShopSerializer(shops, many=True)
        return Response(serializer.data, status=200)
    
    def get(self, request, id_shop):
        try:
            shop = Shop.objects.get(id_shop=id_shop)
            serializer = ShopDetailSerializer(shop)
            return Response(serializer.data, status=200)
        except Shop.DoesNotExist:
            return Response({"message": "Tienda no encontrada"}, status=404)
        
    def delete(self, request, id_shop):
        shop = get_object_or_404(Shop, id_shop=id_shop)
        shop.delete()
        return Response({'message': 'Shop deleted successfully'}, status=204)

class SellerShopsView(APIView):
    permission_classes=[IsAuthenticated]
    
    def get(self, request):
        profile = request.user.profile
        shops = Shop.objects.filter(profile=profile)
        serializer = ShopSerializer(shops, many=True)
        return Response(serializer.data, status=200)