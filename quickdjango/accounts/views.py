from .models import Profile
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from .serializers import  ProfileSerializerRegister, UserSerializerRegister, ProfileSerializer, ProfileSerializerByCode, UserSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.parsers import MultiPartParser, FormParser
from django.contrib.auth.hashers import check_password
from django.shortcuts import get_object_or_404


class RegisterView(APIView):
    
    permission_classes = [AllowAny]
    
    def post(self, request):
        serializer = UserSerializerRegister(data=request.data)
         
        if serializer.is_valid():
            user = serializer.save()
            
            #provicional
            profile_data = {'user_id': user.id, 'user_type': request.data.get('user_type')}
            serializer = ProfileSerializerRegister(data=profile_data)
            if serializer.is_valid():
                profile = serializer.save()
                return Response({'user': user.email}, status=status.HTTP_201_CREATED)
            else: 
                user.delete()
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    
    permission_classes = [AllowAny]

    def post(self, request):
        user_data = request.data.get('user')
        if user_data:
            username = user_data.get('username')
            password = user_data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                # Serializar los datos del usuario
                user_serializer = UserSerializer(user)
                refresh = RefreshToken.for_user(user)
                return Response({
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                    'user': user_serializer.data,  # Incluir datos del usuario en la respuesta
                }, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Invalid username or password'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({'error': 'Invalid request data'}, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class ProfileView(APIView):

    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get(self, request):
        if request.user.is_authenticated:
            profile = Profile.objects.get(user=request.user)
            serializer = ProfileSerializer(profile)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Usuario no autenticado'}, status=status.HTTP_401_UNAUTHORIZED)
    

    def put(self, request):    
        profile = Profile.objects.get(user=request.user) 
        serializer = ProfileSerializer(profile, data=request.data)
        if serializer.is_valid():  
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

class ProfileByIdView(APIView):
    
    permission_classes = [AllowAny]

    def get(self, request, id):
        profile = get_object_or_404(Profile, pk=id)
        serializer = ProfileSerializerByCode(profile)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class PasswordUpdateView(APIView):

    # permission_classes = [IsAuthenticated]

    def post(self, request):
        # if request.user.is_authenticated:
        user = User.objects.get(username=request.data['user']['username'])
        old_password = request.data['oldPassword']
        new_password = request.data['newPassword']
        confirm_new_password = request.data['confirmPassword']

        if check_password(old_password, user.password):
            if new_password == confirm_new_password:
                user.set_password(new_password)
                user.save()
                return Response({'success': 'Password updated'}, status=status.HTTP_200_OK)
            else:
                return Response({'error'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error': 'Incorrect old password'}, status=status.HTTP_400_BAD_REQUEST)
    