from django.contrib import admin
from .models import Order, OrderProduct

# Register your models here.

class OrderProductInline(admin.TabularInline):
    model = OrderProduct
    extra = 1

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id_order', 'profile', 'order_date', 'status')
    list_filter = ('status',)
    inlines = [OrderProductInline]

admin.site.register(OrderProduct)
