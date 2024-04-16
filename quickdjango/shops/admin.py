from django.contrib import admin
from .models import Shop, Product

# Register your models here.

@admin.register(Shop)
class ShopAdmin(admin.ModelAdmin):
    list_display = ('id_shop', 'name', 'title', 'description', 'address', 'logo')
    search_fields = ('name', 'title', 'description', 'address')
    list_filter = ('name', 'title')


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('id_product', 'shop', 'name', 'price', 'description', 'stock_quantity')
    search_fields = ('name', 'description')
    list_filter = ('shop', 'price')
