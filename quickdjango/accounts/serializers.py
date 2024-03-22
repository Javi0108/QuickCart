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

class ProfileSerializerRegister(serializers.ModelSerializer):
    user_id = serializers.PrimaryKeyRelatedField(source='user', queryset=User.objects.all())

    class Meta:
        model = Profile
        fields = ['id_profile', 'user_id', 'user_type']
        
class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    
    class Meta:
        model = Profile
        fields = ['id_profile', 'user', 'phone', 'mobile', 'address', 'user_type']

# class ProfileSerializerWithoutSocials(serializers.ModelSerializer):
#     user = UserSerializer()  # No establecer como de solo lectura
    
#     class Meta:
#         model = Profile
#         fields = ['user', 'phone', 'mobile', 'address']


class ProfileSerializerWithoutSocials(serializers.ModelSerializer):
    user = UserSerializer()  
    
    class Meta:
        model = Profile
        fields = ['user', 'phone', 'mobile', 'address']
        
    def update(self, instance, validated_data):
        # Actualizar los campos del perfil
        instance.phone = validated_data.get('phone', instance.phone)
        instance.mobile = validated_data.get('mobile', instance.mobile)
        instance.address = validated_data.get('address', instance.address)
        
        # Obtener los datos del usuario
        user_data = validated_data.pop('user', None)
        if user_data:
            # Actualizar el usuario asociado
            user_instance = instance.user
            user_serializer = UserSerializer(user_instance, data=user_data)
            if user_serializer.is_valid():
                user_serializer.save()
            else:
                # Si hay errores de validación en el serializador del usuario,
                # lanza una excepción de validación para que la vista pueda manejarla.
                raise serializers.ValidationError(user_serializer.errors)
        
        instance.save()
        return instance
