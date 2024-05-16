from django.contrib import admin
from .models import Shop, Section, ShopSectionOrder, Product, Tag, ProductImage, Comment

# Register your models here.

@admin.register(Shop)
class ShopAdmin(admin.ModelAdmin):
    list_display = ('id_shop', 'profile', 'name', 'title', 'description', 'address', 'logo')
    search_fields = ('name', 'title', 'description', 'address')
    list_filter = ('name', 'title')

@admin.register(Section)
class SectionAdmin(admin.ModelAdmin):
    list_display = ('id', 'type', 'data')
    search_fields = ('type',)

@admin.register(ShopSectionOrder)
class ShopSectionOrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'section', 'order', 'shop')
    #search_fields = ('shop__name',)
    list_filter = ('shop',)

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('id_product', 'shop', 'name', 'price', 'description', 'stock_quantity')
    search_fields = ('name', 'description')
    list_filter = ('shop', 'price')

@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('name',)

@admin.register(ProductImage)
class ProductImageAdmin(admin.ModelAdmin):
    list_display = ('id', 'product', 'image')
    search_fields = ('product__name',)
    
@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('id', 'product', 'author', 'date_posted', 'content')
    search_fields = ('product__name', 'author__user__username', 'content')
    list_filter = ('date_posted', 'author')
    date_hierarchy = 'date_posted'
