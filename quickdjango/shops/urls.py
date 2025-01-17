from django.urls import path
from . import views

app_name = 'shops'

urlpatterns = [
    path('', views.ShopView.as_view(), name='all-shops'),
    path('seller/<int:id_seller>', views.ShopView.as_view(), name='all-shops-by-seller'),
    path('my-shops/', views.SellerShopsView.as_view(), name='my-shops'),
    path('create-shop/', views.SellerShopsView.as_view(), name='create-shop'),
    path('edit/<int:id_shop>/', views.SellerShopsView.as_view(), name='edit-shop'),
    path('detail/<int:id_shop>/', views.SellerShopsView.as_view(), name='shop-detail'),
    path('delete/<int:id_shop>/', views.SellerShopsView.as_view(), name='delete-dhop'),

    path('add-shop-section/', views.SellerShopSectionView.as_view(), name='add-shop-section'),
    path('sections/edit/<int:id_shop_section>/', views.SellerShopSectionView.as_view(), name='sections-by-shop'),
    path('sections/delete/<int:id_shop_section>/', views.SellerShopSectionView.as_view(), name='delete-section'),
    
    path('catalog/',views.ProductsView.as_view(), name="products"),
    path('shop-catalog/<int:id_shop>',views.ProductsView.as_view(), name="shop-catalog"),
    path('product/<int:id_product>/', views.ProductsView.as_view(), name='product-detail'),
    path('create-product/', views.ProductsView.as_view(), name='create-product'),
    path('edit/product/<int:id_product>/', views.ProductsView.as_view(), name='edit-product'),
    path('delete/product/<int:id_product>/', views.ProductsView.as_view(), name='delete-product'),

]