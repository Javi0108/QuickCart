from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import Shop
from .serializers import ShopSerializer, ShopDetailSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import ShopSerializer  # Importa tu serializador de tienda aquí

class CreateShopsView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        print("Datos de la solicitud:", request.data)
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

class ShopView(APIView):
    permission_classes = [IsAuthenticated]    

    def get(self, request):
        shops = Shop.objects.all()
        serializer = ShopSerializer(shops, many=True)
        return Response(serializer.data, status=200)

class SellerShopsView(APIView):
    permission_classes=[IsAuthenticated]
    
    def get(self, request):
        profile = request.user.profile
        shops = Shop.objects.filter(profile=profile)
        serializer = ShopSerializer(shops, many=True)
        return Response(serializer.data, status=200)