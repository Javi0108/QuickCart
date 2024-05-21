<<<<<<< HEAD
from accounts.models import Profile
from django.test import TestCase

from django.urls import reverse
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.test import APIClient
from rest_framework_simplejwt.tokens import RefreshToken

from io import BytesIO
from PIL import Image

class RegisterViewTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = reverse("accounts:register")
        self.data = {
            "username": "testuser",
            "email": "testuser@example.com",
            "password": "password123",
            "user_type": "Client",
        }

    def test_register(self):
        response = self.client.post(self.url, self.data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn("user", response.data)


class LoginViewTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="testuser", password="password123"
        )
        self.client = APIClient()
        self.url = reverse("accounts:login")
        self.data = {"user": {"username": "testuser", "password": "password123"}}

    def test_login(self):
        response = self.client.post(self.url, self.data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("refresh", response.data)
        self.assertIn("access", response.data)
        self.assertIn("user", response.data)


class LogoutViewTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="testuser", password="password123"
        )
        self.refresh = RefreshToken.for_user(self.user)
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        self.url = reverse("accounts:logout")

    def test_logout(self):
        response = self.client.post(
            self.url, {"refresh_token": str(self.refresh)}, format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_205_RESET_CONTENT)


class ProfileViewTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="testuser", password="password123"
        )
        self.profile = Profile.objects.create(user=self.user, user_type="Client")
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        self.url = reverse("accounts:profile")

    def test_get_profile(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("user", response.data)

    def test_update_profile(self):
        data = {
            "phone": "99999999",
        }        
        
        response = self.client.put(self.url, data, format="multipart")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["phone"], "99999999")

class ProfileByIdViewTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="testuser", password="password123"
        )
        self.profile = Profile.objects.create(user=self.user, user_type="Client")
        self.client = APIClient()
        self.url = reverse("accounts:profileById", args=[self.profile.id_profile])

    def test_get_profile_by_id(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("user", response.data)


class PasswordUpdateViewTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="testuser", password="password123"
        )
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        self.url = reverse("accounts:change_password")
        self.data = {
            "user": {"username": "testuser"},
            "oldPassword": "password123",
            "newPassword": "newpassword123",
            "confirmPassword": "newpassword123",
        }

    def test_password_update(self):
        response = self.client.post(self.url, self.data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["success"], "Password updated")
=======
>>>>>>> 0baae1021f8ce3dc51b8c40f6e5953888f59b86d
