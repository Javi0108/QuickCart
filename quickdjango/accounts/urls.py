from django.urls import path
from . import views

app_name = 'accounts'

urlpatterns = [
    path('register/', views.RegisterView.as_view(), name='register'),
    path('login/', views.LoginView.as_view(), name='login'),
    path('logout/', views.LogoutView.as_view(), name='logout'),
    path('profile/', views.ProfileView.as_view(), name='profile'),
    path('profile/<int:id>/', views.ProfileByIdView.as_view(), name='profileById'),
    path('change-password/', views.PasswordUpdateView.as_view(), name='change_password'),

]
