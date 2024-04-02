from django.urls import path
from . import views

app_name = 'shops'

urlpatterns = [
    path('my-shops/', views.SellerShopsView.as_view(), name='my-shops'),
    path('create-shop/', views.SellerShopsView.as_view(), name='create-shop'),
    path('detail/<int:id_shop>/', views.SellerShopsView.as_view(), name='shop-detail'),
    path('delete/<int:id_shop>/', views.SellerShopsView.as_view(), name='shop-detail'),
    
    path('shops/', views.ShopView.as_view(), name='all-shops'),
]