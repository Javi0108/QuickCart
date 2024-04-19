from rest_framework import serializers
from .models import Shop, Product, Section
       
 # PRODUCTS

class ProductSerializer(serializers.ModelSerializer):   
    
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


