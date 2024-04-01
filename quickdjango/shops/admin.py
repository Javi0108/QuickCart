from django.contrib import admin
from .models import Shop, Product

# Register your models here.

@admin.register(Shop)
class ShopAdmin(admin.ModelAdmin):
    list_display = ('id_shop', 'shop_name', 'title', 'description', 'address', 'logo')
    search_fields = ('shop_name', 'title', 'description', 'address')
    list_filter = ('shop_name', 'title')

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('id_product', 'shop', 'product_name', 'price', 'description', 'stock_quantity')
    search_fields = ('product_name', 'description')
    list_filter = ('shop', 'price')
