from rest_framework import serializers
from .models import Shop, Product, Section, ProductImage
       
 # PRODUCTS

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ('id', 'image')  # Ajusta los campos según tu modelo de imágenes

class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)  # Incluye la serialización de las imágenes

    class Meta:
        model = Product
        fields = '__all__'
                   
# SHOP 

class ShopSerializer(serializers.ModelSerializer):
    
    products = ProductSerializer(many=True, read_only=True)

    class Meta:
        model = Shop
        fields = '__all__'


class ShopDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shop
        fields = '__all__'


class ShopSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = '__all__'


