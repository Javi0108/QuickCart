from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import Shop, Product
from .serializers import ShopSerializer, ShopDetailSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import ShopSerializer,ProductSerializer
from django.shortcuts import get_object_or_404
from rest_framework import status
from django.core.files.base import ContentFile
import base64


class CreateShopsView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        profile = request.user.profile
        request_data = request.data.copy() 
        request_data['profile'] = profile.id_profile 
        serializer = ShopSerializer(data=request_data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DetailShopView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, id_shop):
        try:
            shop = Shop.objects.get(id_shop=id_shop)
            serializer = ShopDetailSerializer(shop)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Shop.DoesNotExist:
            return Response({"message": "Tienda no encontrada"}, status=status.HTTP_404_NOT_FOUND)
        
    def delete(self, request, id_shop):
        shop = get_object_or_404(Shop, id=id_shop)
        shop.delete()
        return Response({'message': 'Shop deleted successfully'}, status=status.HTTP_204_NO_CONTENT)

class ShopView(APIView):
    permission_classes = [IsAuthenticated]    

    def get(self, request):
        shops = Shop.objects.all()
        serializer = ShopSerializer(shops, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class SellerShopsView(APIView):
    permission_classes=[IsAuthenticated]
    
    def get(self, request, id_shop=None):
        # Si no se proporciona un ID de tienda, devuelve todas las tiendas del vendedor
        print(id_shop)
        if id_shop is None:
            profile = request.user.profile
            shops = Shop.objects.filter(profile=profile)
            serializer = ShopSerializer(shops, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        # Si se proporciona un ID de tienda, devuelve los detalles de esa tienda
        try:
            shop = Shop.objects.get(id_shop=id_shop)
            serializer = ShopDetailSerializer(shop)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Shop.DoesNotExist:
            return Response({"message": "Tienda no encontrada"}, status=status.HTTP_404_NOT_FOUND)
    
    def post(self, request):
        profile = request.user.profile
        request_data = request.data.copy() 
        
        # Decodifica la imagen en base64 y la guarda en el campo 'logo'
        if 'logo' in request_data:
            image_data = request_data.pop('logo')
            format, imgstr = image_data.split(';base64,')
            ext = format.split('/')[-1]
            request_data['logo'] = ContentFile(base64.b64decode(imgstr), name=f'logo.{ext}')
        
        request_data['profile'] = profile.id_profile 
        serializer = ShopSerializer(data=request_data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def delete(self, request, id_shop):
        shop = get_object_or_404(Shop, id_shop=id_shop)
        
        if request.user != shop.profile.user:
            return Response({'error': 'You are not allowed to delete this shop.'}, status=status.HTTP_403_FORBIDDEN)
        
        shop.delete()
        return Response({'message': 'Shop deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        
    
    # PRODUCTS

class ProductsView(APIView):
    permission_classes=[IsAuthenticated]

    def get(self, request, id_product=None, id_shop=None):
        if id_product is not None:
            try:
                product = Product.objects.get(id_product=id_product)
                serializer = ProductSerializer(product)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Product.DoesNotExist:
                return Response({"message": "Producto no encontrado"}, status=status.HTTP_404_NOT_FOUND)

        elif id_shop is not None:
            try:
                products = Product.objects.filter(shop_id=id_shop)
                serializer = ProductSerializer(products, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Product.DoesNotExist:
                return Response({"message": "Productos no encontrados para esta tienda"}, status=status.HTTP_404_NOT_FOUND)

        else:
            products = Product.objects.all()
            serializer = ProductSerializer(products, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)