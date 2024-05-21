from .models import Profile
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from .serializers import (
    ProfileSerializerRegister,
    UserSerializerRegister,
    ProfileSerializer,
    ProfileSerializerByCode,
    UserSerializer,
)
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.parsers import MultiPartParser, FormParser
from django.contrib.auth.hashers import check_password
from django.shortcuts import get_object_or_404


class RegisterView(APIView):
    """
    View for user registration.
    """

    permission_classes = [AllowAny]

    def post(self, request):
        """
        Registers a new user.

        Parameters:
        request (Request): The incoming request containing user data.

        Returns:
        Response: A response indicating success or failure of the registration process.
        """
        serializer = UserSerializerRegister(data=request.data)

        if serializer.is_valid():
            user = serializer.save()

            # provicional
            profile_data = {
                "user_id": user.id,
                "user_type": request.data.get("user_type"),
            }
            serializer = ProfileSerializerRegister(data=profile_data)
            if serializer.is_valid():
                profile = serializer.save()
                return Response({"user": user.email}, status=status.HTTP_201_CREATED)
            else:
                user.delete()
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    """
    View for user login.
    """

    permission_classes = [AllowAny]

    def post(self, request):
        """
        Authenticates a user.

        Parameters:
        request (Request): The incoming request containing user credentials.

        Returns:
        Response: A response containing the user's authentication tokens if successful, or an error message if unsuccessful.
        """
        user_data = request.data.get("user")
        if user_data:
            username = user_data.get("username")
            password = user_data.get("password")
            user = authenticate(username=username, password=password)
            if user is not None:
                # Serialize user data
                user_serializer = UserSerializer(user)
                refresh = RefreshToken.for_user(user)
                return Response(
                    {
                        "efresh": str(refresh),
                        "access": str(refresh.access_token),
                        "user": user_serializer.data,  # Include user data in the response
                    },
                    status=status.HTTP_200_OK,
                )
            else:
                return Response(
                    {"error": "Invalid username or password"},
                    status=status.HTTP_401_UNAUTHORIZED,
                )
        else:
            return Response(
                {"error": "Invalid request data"}, status=status.HTTP_400_BAD_REQUEST
            )


class LogoutView(APIView):
    """
    View for user logout.
    """

    permission_classes = [IsAuthenticated]

    def post(self, request):
        """
        Blacklists the user's refresh token, effectively logging them out.

        Parameters:
        request (Request): The incoming request containing the refresh token.

        Returns:
        Response: A response indicating successful logout or an error message if unsuccessful.
        """
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class ProfileView(APIView):
    """
    View for user profile management.
    """

    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get(self, request):
        """
        Retrieves the user's profile.

        Parameters:
        request (Request): The incoming request.

        Returns:
        Response: A response containing the user's profile data if successful, or an error message if unsuccessful.
        """
        if request.user.is_authenticated:
            profile = Profile.objects.get(user=request.user)
            serializer = ProfileSerializer(profile)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(
                {"error": "Usuario no autenticado"}, status=status.HTTP_401_UNAUTHORIZED
            )

    def put(self, request):
        """
        Updates the user's profile.

        Parameters:
        request (Request): The incoming request containing updated profile data.

        Returns:
        Response: A response indicating success or failure of the update process.
        """
        profile = Profile.objects.get(user=request.user)
        serializer = ProfileSerializer(profile, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProfileByIdView(APIView):
    """
    View for retrieving a user profile by ID.
    """

    permission_classes = [AllowAny]

    def get(self, request, id):
        """
        Retrieves a user profile by ID.

        Parameters:
        request (Request): The incoming request.
        id (int): The ID of the user profile to retrieve.

        Returns:
        Response: A response containing the user profile data if successful, or an error message if unsuccessful.
        """
        profile = get_object_or_404(Profile, pk=id)
        serializer = ProfileSerializerByCode(profile)
        return Response(serializer.data, status=status.HTTP_200_OK)


class PasswordUpdateView(APIView):
    """
    View for updating a user's password.
    """

    # permission_classes = [IsAuthenticated]

    def post(self, request):
        """
        Updates a user's password.

        Parameters:
        request (Request): The incoming request containing the user's old and new passwords.

        Returns:
        Response: A response indicating success or failure of the password update process.
        """
        # if request.user.is_authenticated:
        user = User.objects.get(username=request.data["user"]["username"])
        old_password = request.data["oldPassword"]
        new_password = request.data["newPassword"]
        confirm_new_password = request.data["confirmPassword"]

        if check_password(old_password, user.password):
            if new_password == confirm_new_password:
                user.set_password(new_password)
                user.save()
                return Response(
                    {"success": "Password updated"}, status=status.HTTP_200_OK
                )
            else:
                return Response(
                    {"error": "Passwords do not match"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        else:
            return Response(
                {"error": "Incorrect old password"}, status=status.HTTP_400_BAD_REQUEST
            )
