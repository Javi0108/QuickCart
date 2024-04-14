from .models import Profile
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from .serializers import  ProfileSerializerRegister, ProfileSerializerWithoutSocials, UserSerializerRegister, ProfileSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken, BlacklistMixin

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
                refresh = RefreshToken.for_user(user)
                return Response({
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
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

    def get(self, request):
        if request.user.is_authenticated:
            profile = Profile.objects.get(user=request.user)
            serializer = ProfileSerializer(profile)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Usuario no autenticado'}, status=status.HTTP_401_UNAUTHORIZED)
    
    def put(self, request):
        try:
            profile = Profile.objects.get(user=request.user)
            serializer = ProfileSerializer(profile, data=request.data.get('profile'))
            if serializer.is_valid():  
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Profile.DoesNotExist:
            return Response({'error': 'El perfil no existe'}, status=status.HTTP_404_NOT_FOUND)
