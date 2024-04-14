from rest_framework import serializers
from .models import Profile
from django.contrib.auth.models import User

class UserSerializerRegister(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')


    def create(self, validated_data):
        password = validated_data.pop('password', None)
        user = User.objects.create_user(**validated_data, password=password)
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email')

class UserSerializerUpdate(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email')

class ProfileSerializerRegister(serializers.ModelSerializer):
    user_id = serializers.PrimaryKeyRelatedField(source='user', queryset=User.objects.all())

    class Meta:
        model = Profile
        fields = ['id_profile', 'user_id', 'user_type']
        
class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializerUpdate()
    
    class Meta:
        model = Profile
        fields = ['id_profile', 'user', 'phone', 'mobile', 'address', 'user_type']

    def update(self, instance, validated_data):
        instance.phone = validated_data.get('phone', instance.phone)
        instance.mobile = validated_data.get('mobile', instance.mobile)
        instance.address = validated_data.get('address', instance.address)
            
        user_data = validated_data.pop('user', None)
        if user_data:
            user_instance = instance.user
            user_serializer = UserSerializerUpdate(user_instance, data=user_data)
            if user_serializer.is_valid():
                user_serializer.save()
            else:
                raise serializers.ValidationError(user_serializer.errors)
            
        instance.save()
        return instance

# class ProfileSerializerWithoutSocials(serializers.ModelSerializer):
#     user = UserSerializer()  # No establecer como de solo lectura
    
#     class Meta:
#         model = Profile
#         fields = ['user', 'phone', 'mobile', 'address']

class ProfileSerializerWithoutSocials(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['id_profile', 'user_name', 'user_type', 'phone', 'mobile', 'address']

# class ProfileSerializerWithoutSocials(serializers.ModelSerializer):
#     user = UserSerializer()  
    
#     class Meta:
#         model = Profile
#         fields = [#'user',
#              'phone', 'mobile', 'address'
#              ]
        
#     def update(self, instance, validated_data):
#         instance.phone = validated_data.get('phone', instance.phone)
#         instance.mobile = validated_data.get('mobile', instance.mobile)
#         instance.address = validated_data.get('address', instance.address)
        
#         # user_data = validated_data.pop('user', None)
#         # if user_data:
#         #     user_instance = instance.user
#         #     user_serializer = UserSerializer(user_instance, data=user_data)
#         #     if user_serializer.is_valid():
#         #         user_serializer.save()
#         #     else:
#         #         raise serializers.ValidationError(user_serializer.errors)
        
#         instance.save()
#         return instance
