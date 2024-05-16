from rest_framework import serializers
from .models import Shop, Product, Section, ProductImage, Comment
from accounts.models import Profile
from django.contrib.auth.models import User

 # PRODUCTS

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ('id', 'image')

class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)

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
        
class CreateCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
        
        
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']

class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Profile
        fields = ['user', 'avatar']

class CommentSerializer(serializers.ModelSerializer):
    author = ProfileSerializer()

    class Meta:
        model = Comment
        fields = ['id', 'product', 'author', 'content', 'date_posted']