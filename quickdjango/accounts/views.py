from .models import Profile
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from .serializers import  ProfileSerializer, UserSerializer
from rest_framework.views import APIView
from rest_framework.response import Response


class RegisterView(APIView):
    
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({'user': user.email}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)

        if user is not None:
            return Response(status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid username or password'}, status=status.HTTP_401_UNAUTHORIZED)

class ProfileView(APIView):
   
    def get(self, request):
        # Verificar si el usuario está autenticado
        print(request.user)
        if request.user.is_authenticated:
            # Obtener el perfil del usuario logeado
            profile = Profile.objects.get(user=request.user)
            # Serializar el perfil
            serializer = ProfileSerializer(profile)
            # Devolver el perfil serializado en la respuesta
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            # Devolver un mensaje indicando que el usuario no está autenticado
            return Response({'error': 'Usuario no autenticado'}, status=status.HTTP_401_UNAUTHORIZED)

