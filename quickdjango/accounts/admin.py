# admin.py

from django.contrib import admin
from .models import Profile, Order, Shop, Product, Invoice, InvoiceProduct, OrderProduct

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('id_profile', 'user', 'type')

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id_order', 'profile', 'order_date', 'status')

@admin.register(Shop)
class ShopAdmin(admin.ModelAdmin):
    list_display = ('id_shop', 'profile', 'shop_name', 'location')

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('id_product', 'shop', 'product_name', 'price', 'description', 'stock_quantity')

@admin.register(Invoice)
class InvoiceAdmin(admin.ModelAdmin):
    list_display = ('id_invoice', 'order', 'profile', 'invoice_date', 'total_amount')

@admin.register(InvoiceProduct)
class InvoiceProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'invoice', 'product', 'quantity')

@admin.register(OrderProduct)
class OrderProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'order', 'product', 'quantity')
