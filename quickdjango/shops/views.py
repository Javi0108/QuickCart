from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import Shop, Product, ShopSectionOrder, Section, ProductImage
from .serializers import ShopSerializer, ShopDetailSerializer, ShopSectionSerializer
from .serializers import ShopSerializer,ProductSerializer,ProductImageSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from rest_framework import status
from django.core.files.base import ContentFile
import base64

class ShopView(APIView):
    permission_classes = [IsAuthenticated]    

    def get(self, request, id_seller=None):
        if id_seller is not None:
            shops = Shop.objects.filter(profile_id=id_seller)
        else:
            shops = Shop.objects.all()
        
        serializer = ShopSerializer(shops, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class SellerShopsView(APIView):
    permission_classes=[IsAuthenticated]
    
    def get(self, request, id_shop=None):
        if id_shop is None:
            profile = request.user.profile
            shops = Shop.objects.filter(profile=profile)
            serializer = ShopSerializer(shops, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        # Si se proporciona un ID de tienda, devuelve los detalles de esa tienda
        try:
            shop = Shop.objects.get(id_shop=id_shop)
            serializer = ShopDetailSerializer(shop)
            
            # Obtener las secciones ordenadas por el campo 'order'
            sections = Section.objects.filter(shopsectionorder__shop_id=id_shop).order_by('shopsectionorder__order')
            serialized_sections = ShopSectionSerializer(sections, many=True)
            
            return Response({"shop_data": serializer.data, "sections": serialized_sections.data}, status=status.HTTP_200_OK)
        except Shop.DoesNotExist:
            return Response({"message": "Tienda no encontrada"}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request):
        profile = request.user.profile
        request_data = request.data.copy() 
                
        # Decodifica la imagen en base64 y la guarda en el campo 'logo'
        if 'logo' in request_data:
            image_data = request_data.pop('logo')
            format, imgstr = image_data.split(';base64,')
            ext = format.split('/')[-1]
            request_data['logo'] = ContentFile(base64.b64decode(imgstr), name=f'logo.{ext}')
        
        request_data['profile'] = profile.id_profile 
        serializer = ShopSerializer(data=request_data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def put(self, request, id_shop):
        try:
            shop = Shop.objects.get(id_shop=id_shop)
            if request.user != shop.profile.user:
                return Response({'error': 'You are not allowed to update this shop.'}, status=status.HTTP_403_FORBIDDEN)

            if 'logo' in request.data and not request.data['logo'].startswith('http'):
                image_data = request.data.pop('logo')
                format, imgstr = image_data.split(';base64,')
                ext = format.split('/')[-1]
                request.data['logo'] = ContentFile(base64.b64decode(imgstr), name=f'logo.{ext}')
            elif 'logo' in request.data and request.data['logo'].startswith('http'):
                del request.data['logo']

            serializer = ShopSerializer(shop, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                print('Shop updated successfully:', serializer.data)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                print('Error updating shop:', serializer.errors)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Shop.DoesNotExist:
            print('Error: Shop not found')
            return Response({"error": "La tienda no existe"}, status=status.HTTP_400_BAD_REQUEST)


    def delete(self, request, id_shop):
        shop = get_object_or_404(Shop, id_shop=id_shop)
        
        if request.user != shop.profile.user:
            return Response({'error': 'You are not allowed to delete this shop.'}, status=status.HTTP_403_FORBIDDEN)
        
        shop.delete()
        return Response({'message': 'Shop deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        

class SellerShopSectionView(APIView):
    permission_classes=[IsAuthenticated]

    def post(self, request):
        id_shop = request.data.get('id_shop')
        shop_data = request.data.get('shop_data')
        order = request.data.get('order')

        try:
            shop = Shop.objects.get(id_shop=id_shop)
        except Shop.DoesNotExist:
            return Response({"error": "La tienda no existe"}, status=status.HTTP_404_NOT_FOUND)
        
        section_serializer = ShopSectionSerializer(data=shop_data)

        if section_serializer.is_valid():
            section = section_serializer.save()
            shop_section_order = ShopSectionOrder.objects.create(shop=shop, section=section, order=order)
            return Response({"success": "Sección de tienda creada exitosamente"}, status=status.HTTP_201_CREATED)
        else:
            print(section_serializer.errors)
            return Response({"error": "Datos de sección no válidos"}, status=status.HTTP_400_BAD_REQUEST)
        
    # def put(self, request, id_shop_section): 
    #     try:
    #         section = Section.objects.get(pk=id_shop_section)
    #     except Section.DoesNotExist: 
    #         return Response({"error": "La sección de tienda no existe"}, status=status.HTTP_400_BAD_REQUEST)
        
    #     shop_data = request.data.get('shop_data')
    #     section_serializer = ShopSectionSerializer(instance=section, data=shop_data)
        
    #     if section_serializer.is_valid():
    #         section_serializer.save()
    #         return Response({"success": "Sección de tienda actualizada exitosamente"}, status=status.HTTP_200_OK)
    #     else:
    #         print(section_serializer.errors)
    #         return Response({"error": "Datos de sección no válidos"}, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request, id_shop_section): 
        try:
            section = Section.objects.get(pk=id_shop_section)
        except Section.DoesNotExist: 
            return Response({"error": "La sección de tienda no existe"}, status=status.HTTP_400_BAD_REQUEST)
        
        shop_data = request.data.get('shop_data')
        order = request.data.get('order')  # Obtener el nuevo orden desde la solicitud
        section_serializer = ShopSectionSerializer(instance=section, data=shop_data)
        
        if section_serializer.is_valid():
            section_serializer.save()
            # Actualizar el orden en ShopSectionOrder
            ShopSectionOrder.objects.filter(section=section).update(order=order)
            return Response({"success": "Sección de tienda actualizada exitosamente"}, status=status.HTTP_200_OK)
        else:
            print(section_serializer.errors)
            return Response({"error": "Datos de sección no válidos"}, status=status.HTTP_400_BAD_REQUEST)
        
    def delete(self, request, id_shop_section):
        try:
            section = Section.objects.get(pk=id_shop_section)
            section.delete()
            return Response({"success": "Sección de tienda eliminada exitosamente"}, status=status.HTTP_204_NO_CONTENT)
        except Section.DoesNotExist:
            return Response({"error": "La sección de tienda no existe"}, status=status.HTTP_404_NOT_FOUND)
    
    
# PRODUCTS

class ProductsView(APIView):
    permission_classes=[IsAuthenticated]

    def get(self, request, id_product=None, id_shop=None):
        if id_product is not None:
            try:
                product = Product.objects.get(id_product=id_product)
                serializer = ProductSerializer(product)
                product_images = ProductImage.objects.filter(product=product)
                product_data = serializer.data
                product_data['images'] = ProductImageSerializer(product_images, many=True).data
                return Response(product_data, status=status.HTTP_200_OK)
            except Product.DoesNotExist:
                return Response({"message": "Producto no encontrado"}, status=status.HTTP_404_NOT_FOUND)

        elif id_shop is not None:
            try:
                products = Product.objects.filter(shop_id=id_shop)
                serializer = ProductSerializer(products, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Product.DoesNotExist:
                return Response({"message": "Productos no encontrados para esta tienda"}, status=status.HTTP_404_NOT_FOUND)

        else:
            products = Product.objects.all()
            serializer = ProductSerializer(products, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        # Extraer los datos de la solicitud
        shop_id = request.data.get('shopId')
        name = request.data.get('name')
        brand = request.data.get('brand')
        short_description = request.data.get('short_description')
        description = request.data.get('description')
        price = request.data.get('price')
        stock_quantity = request.data.get('stock_quantity')
        
        # Verificar que se proporciona el ID de la tienda
        if not shop_id:
            return Response({'error': 'El ID de la tienda es requerido.'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Obtener la tienda usando el ID proporcionado
        shop = get_object_or_404(Shop, id_shop=shop_id)
        
        # Crear los datos para el producto, incluyendo la tienda asociada
        product_data = {
            'shop': shop.id_shop,
            'name': name,
            'brand': brand,
            'short_description': short_description,
            'description': description,
            'price': price,
            'stock_quantity': stock_quantity
        }
        
        # Decodificar la imagen en base64 y guardarla como un archivo
        if 'avatar' in request.data:
            avatar_data = request.data.pop('avatar')
            format, imgstr = avatar_data.split(';base64,')
            ext = format.split('/')[-1]
            image_name = f'avatar_{shop_id}_{name}.{ext}'  # Nombre de archivo personalizado
            image_data = ContentFile(base64.b64decode(imgstr), name=image_name)
            product_data['avatar'] = image_data
        
        if 'galleryPreviews' in request.data:
            gallery_images = request.data['galleryPreviews']
            gallery_data = []
            for img_data in gallery_images:
                format, imgstr = img_data.split(';base64,')
                ext = format.split('/')[-1]
                image_name = f'gallery_{shop_id}_{name}_{len(gallery_data)}.{ext}'  # Nombre de archivo personalizado
                image_data = ContentFile(base64.b64decode(imgstr), name=image_name)
                gallery_data.append(image_data)

        # Crear el producto usando el serializador
        serializer = ProductSerializer(data=product_data)
        if serializer.is_valid():
            product = serializer.save()
            for img in gallery_data:
                ProductImage.objects.create(product=product, image=img)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id_product):
        # Obtener el producto existente por su ID
        product = get_object_or_404(Product, id_product=id_product)

        # Extraer los datos de la solicitud
        name = request.data.get('name')
        brand = request.data.get('brand')
        short_description = request.data.get('short_description')
        description = request.data.get('description')
        price = request.data.get('price')
        stock_quantity = request.data.get('stock_quantity')

        # Actualizar los campos del producto
        product.name = name
        product.brand = brand
        product.short_description = short_description
        product.description = description
        product.price = price
        product.stock_quantity = stock_quantity

        # Verificar si se envió una nueva imagen para actualizarla
        if 'avatar' in request.data:
            avatar_data = request.data.pop('avatar')
            format, imgstr = avatar_data.split(';base64,')
            ext = format.split('/')[-1]
            image_name = f'avatar_{id_product}_{name}.{ext}'  # Nombre de archivo personalizado
            image_data = ContentFile(base64.b64decode(imgstr), name=image_name)
            product.avatar = image_data

        if "galleryPreviews" in request.data:
            gallery_images = request.data['galleryPreviews']
            gallery_data = []
            for img_data in gallery_images:
                format, imgstr = img_data.split(';base64,')
                ext = format.split('/')[-1]
                image_name = f'gallery_{id_product}_{name}_{len(gallery_data)}.{ext}'  # Nombre de archivo personalizado
                image_data = ContentFile(base64.b64decode(imgstr), name=image_name)
                gallery_data.append(image_data)

            # Eliminar todas las imágenes de la galería existentes
            product.product_images.all().delete()
            
            # Crear nuevas imágenes de galería
            for img in gallery_data:
                ProductImage.objects.create(product=product, image=img)

        # Guardar los cambios en el producto
        product.save()

        # Serializar y devolver la respuesta actualizada
        serializer = ProductSerializer(product)
        return Response(serializer.data, status=status.HTTP_200_OK)


    def delete(self, request, id_product):
        try:
            product = get_object_or_404(Product, id_product=id_product)
            product.delete()
            return Response({"success": "Producto eliminado exitosamente"}, status=status.HTTP_204_NO_CONTENT)
        except Product.DoesNotExist:
            return Response({"error": "El producto no existe"}, status=status.HTTP_404_NOT_FOUND)