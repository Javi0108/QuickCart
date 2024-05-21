from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import Shop, Product, ShopSectionOrder, Section, ProductImage, Comment
from .serializers import (
    ShopSerializer,
    ShopDetailSerializer,
    ShopSectionSerializer,
    ProductSerializer,
    ProductImageSerializer,
    CommentSerializer,
    CreateCommentSerializer,
)

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
    """
    View for managing sections in a seller's shop.
    """

    permission_classes = [IsAuthenticated]

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
            sections = Section.objects.filter(
                shopsectionorder__shop_id=id_shop
            ).order_by("shopsectionorder__order")
            serialized_sections = ShopSectionSerializer(sections, many=True)

            return Response(
                {"shop_data": serializer.data, "sections": serialized_sections.data},
                status=status.HTTP_200_OK,
            )
        except Shop.DoesNotExist:
            return Response(
                {"message": "Tienda no encontrada"}, status=status.HTTP_404_NOT_FOUND
            )

    def post(self, request):
        """
        Create a new section in a seller's shop.

        Parameters:
        - id_shop (int): The ID of the seller's shop.
        - shop_data (dict): The data for the new section.
        - order (int): The order of the new section.

        Returns:
        - Response: A response indicating the success of the operation.
        """
        profile = request.user.profile
        request_data = request.data.copy()

        # Decodifica la imagen en base64 y la guarda en el campo 'logo'
        if "logo" in request_data:
            image_data = request_data.pop("logo")
            format, imgstr = image_data.split(";base64,")
            ext = format.split("/")[-1]
            request_data["logo"] = ContentFile(
                base64.b64decode(imgstr), name=f"logo.{ext}"
            )

        request_data["profile"] = profile.id_profile
        serializer = ShopSerializer(data=request_data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id_shop):
        """
        Update an existing section in a seller's shop.

        Parameters:
        - id_shop_section (int): The ID of the section to update.
        - shop_data (dict): The updated data for the section.
        - order (int): The updated order of the section.

        Returns:
        - Response: A response indicating the success of the operation.
        """
        try:
            shop = Shop.objects.get(id_shop=id_shop)
            if request.user != shop.profile.user:
                return Response(
                    {"error": "You are not allowed to update this shop."},
                    status=status.HTTP_403_FORBIDDEN,
                )

            if "logo" in request.data and not request.data["logo"].startswith("http"):
                image_data = request.data.pop("logo")
                format, imgstr = image_data.split(";base64,")
                ext = format.split("/")[-1]
                request.data["logo"] = ContentFile(
                    base64.b64decode(imgstr), name=f"logo.{ext}"
                )
            elif "logo" in request.data and request.data["logo"].startswith("http"):
                del request.data["logo"]

            serializer = ShopSerializer(shop, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                print("Shop updated successfully:", serializer.data)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                print("Error updating shop:", serializer.errors)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Shop.DoesNotExist:
            print("Error: Shop not found")
            return Response(
                {"error": "La tienda no existe"}, status=status.HTTP_400_BAD_REQUEST
            )

    def delete(self, request, id_shop):
        """
        Delete an existing section in a seller's shop.

        Parameters:
        - id_shop_section (int): The ID of the section to delete.

        Returns:
        - Response: A response indicating the success of the operation.
        """
        shop = get_object_or_404(Shop, id_shop=id_shop)

        if request.user != shop.profile.user:
            return Response(
                {"error": "You are not allowed to delete this shop."},
                status=status.HTTP_403_FORBIDDEN,
            )

        shop.delete()
        return Response(
            {"message": "Shop deleted successfully"}, status=status.HTTP_204_NO_CONTENT
        )


class SellerShopSectionView(APIView):
    """
    View for managing sections in a seller's shop.
    """

    permission_classes = [IsAuthenticated]

    def post(self, request):
        """
        Create a new section in a seller's shop.

        Parameters:
        - id_shop (int): The ID of the seller's shop.
        - shop_data (dict): The data for the new section.
        - order (int): The order of the new section.

        Returns:
        - Response: A response indicating the success of the operation.
        """
        id_shop = request.data.get("id_shop")
        shop_data = request.data.get("shop_data")
        order = request.data.get("order")

        try:
            shop = Shop.objects.get(id_shop=id_shop)
        except Shop.DoesNotExist:
            return Response(
                {"error": "La tienda no existe"}, status=status.HTTP_404_NOT_FOUND
            )

        section_serializer = ShopSectionSerializer(data=shop_data)

        if section_serializer.is_valid():
            section = section_serializer.save()
            shop_section_order = ShopSectionOrder.objects.create(
                shop=shop, section=section, order=order
            )
            return Response(
                {"success": "Sección de tienda creada exitosamente"},
                status=status.HTTP_201_CREATED,
            )
        else:
            print(section_serializer.errors)
            return Response(
                {"error": "Datos de sección no válidos"},
                status=status.HTTP_400_BAD_REQUEST,
            )

    def put(self, request, id_shop_section):
        """
        Update an existing section in a seller's shop.

        Parameters:
        - id_shop_section (int): The ID of the section to update.
        - shop_data (dict): The updated data for the section.
        - order (int): The updated order of the section.

        Returns:
        - Response: A response indicating the success of the operation.
        """
        try:
            section = Section.objects.get(pk=id_shop_section)
        except Section.DoesNotExist:
            return Response(
                {"error": "La sección de tienda no existe"},
                status=status.HTTP_404_NOT_FOUND,
            )

        shop_data = request.data.get("shop_data")
        order = request.data.get("order")

        section_serializer = ShopSectionSerializer(instance=section, data=shop_data)

        if section_serializer.is_valid():
            section_serializer.save()
            ShopSectionOrder.objects.filter(section=section).update(order=order)
            return Response(
                {"success": "Sección de tienda actualizada exitosamente"},
                status=status.HTTP_200_OK,
            )
        else:
            print(section_serializer.errors)
            return Response(
                {"error": "Datos de sección no válidos"},
                status=status.HTTP_400_BAD_REQUEST,
            )

    def delete(self, request, id_shop_section):
        """
        Delete an existing section in a seller's shop.

        Parameters:
        - id_shop_section (int): The ID of the section to delete.

        Returns:
        - Response: A response indicating the success of the operation.
        """
        try:
            section = Section.objects.get(pk=id_shop_section)
            section.delete()
            return Response(
                {"success": "Sección de tienda eliminada exitosamente"},
                status=status.HTTP_204_NO_CONTENT,
            )
        except Section.DoesNotExist:
            return Response(
                {"error": "La sección de tienda no existe"},
                status=status.HTTP_404_NOT_FOUND,
            )


# PRODUCTS


class ProductsView(APIView):
    """
    View for managing products.
    """

    permission_classes = [IsAuthenticated]

    def get(self, request, id_product=None, id_shop=None):
        """
        Retrieve products based on the provided parameters.
        """
        if id_product is not None:
            try:
                product = Product.objects.get(id_product=id_product)
                serializer = ProductSerializer(product)
                product_images = ProductImage.objects.filter(product=product)
                product_data = serializer.data
                product_data["images"] = ProductImageSerializer(
                    product_images, many=True
                ).data
                return Response(product_data, status=status.HTTP_200_OK)
            except Product.DoesNotExist:
                return Response(
                    {"message": "Producto no encontrado"},
                    status=status.HTTP_404_NOT_FOUND,
                )

        elif id_shop is not None:
            try:
                products = Product.objects.filter(shop_id=id_shop)
                product_data_list = []
                for product in products:
                    serializer = ProductSerializer(product)
                    product_data = serializer.data
                    product_images = ProductImage.objects.filter(product=product)
                    product_data["images"] = ProductImageSerializer(
                        product_images, many=True
                    ).data
                    product_data_list.append(product_data)
                return Response(product_data_list, status=status.HTTP_200_OK)
            except Product.DoesNotExist:
                return Response(
                    {"message": "Productos no encontrados para esta tienda"},
                    status=status.HTTP_404_NOT_FOUND,
                )

        else:
            products = Product.objects.all()
            serializer = ProductSerializer(products, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        """
        Create a new product based on the provided data.
        """

        # Extraer los datos de la solicitud
        shop_id = request.data.get("shopId")
        name = request.data.get("name")
        brand = request.data.get("brand")
        short_description = request.data.get("short_description")
        description = request.data.get("description")
        price = request.data.get("price")
        stock_quantity = request.data.get("stock_quantity")

        # Verificar que se proporciona el ID de la tienda
        if not shop_id:
            return Response(
                {"error": "El ID de la tienda es requerido."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Obtener la tienda usando el ID proporcionado
        shop = get_object_or_404(Shop, id_shop=shop_id)

        # Crear los datos para el producto, incluyendo la tienda asociada
        product_data = {
            "shop": shop.id_shop,
            "name": name,
            "brand": brand,
            "short_description": short_description,
            "description": description,
            "price": price,
            "stock_quantity": stock_quantity,
        }

        # Decodificar la imagen en base64 y guardarla como un archivo
        if "avatar" in request.data:
            avatar_data = request.data.pop("avatar")
            format, imgstr = avatar_data.split(";base64,")
            ext = format.split("/")[-1]
            image_name = (
                f"avatar_{shop_id}_{name}.{ext}"  # Nombre de archivo personalizado
            )
            image_data = ContentFile(base64.b64decode(imgstr), name=image_name)
            product_data["avatar"] = image_data

        if "galleryPreviews" in request.data:
            gallery_images = request.data["galleryPreviews"]
            gallery_data = []
            for img_data in gallery_images:
                format, imgstr = img_data.split(";base64,")
                ext = format.split("/")[-1]
                image_name = f"gallery_{shop_id}_{name}_{len(gallery_data)}.{ext}"  # Nombre de archivo personalizado
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
        """
        Update an existing product based on the provided data.
        """
        product = get_object_or_404(Product, id_product=id_product)

        name = request.data.get("name")
        brand = request.data.get("brand")
        short_description = request.data.get("short_description")
        description = request.data.get("description")
        price = request.data.get("price")
        stock_quantity = request.data.get("stock_quantity")

        product.name = name
        product.brand = brand
        product.short_description = short_description
        product.description = description
        product.price = price
        product.stock_quantity = stock_quantity

        if "avatar" in request.data:
            avatar_data = request.data["avatar"]
            if isinstance(avatar_data, str) and not avatar_data.startswith("/media"):
                format, imgstr = avatar_data.split(";base64,")
                ext = format.split("/")[-1]
                image_name = f"avatar_{id_product}_{name}.{ext}"
                image_data = ContentFile(base64.b64decode(imgstr), name=image_name)
                product.avatar = image_data
            elif (
                isinstance(avatar_data, dict)
                and "url" in avatar_data
                and not avatar_data["url"].startswith("/media")
            ):
                pass

        if "galleryPreviews" in request.data:
            gallery_images = request.data["galleryPreviews"]
            new_gallery_images = []

            existing_images = product.images.all()
            print("Existing Images:", existing_images)
            for existing_image in existing_images:
                new_gallery_images.append(existing_image)

            for img_data in gallery_images:
                if isinstance(img_data, str) and not img_data.startswith("/media"):
                    format, imgstr = img_data.split(";base64,")
                    ext = format.split("/")[-1]
                    image_name = (
                        f"gallery_{id_product}_{name}_{len(new_gallery_images)}.{ext}"
                    )
                    image_data = ContentFile(base64.b64decode(imgstr), name=image_name)
                    new_gallery_image = ProductImage.objects.create(
                        product=product, image=image_data
                    )
                    new_gallery_images.append(new_gallery_image)
                elif (
                    isinstance(img_data, dict)
                    and "url" in img_data
                    and not img_data["url"].startswith("/media")
                ):
                    pass

        product.images.set(new_gallery_images)
        product.save()

        serializer = ProductSerializer(product)
        print("Serializer Data:", serializer.data)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, id_product):
        """
        Delete a product based on the provided product ID.
        """
        try:
            product = get_object_or_404(Product, id_product=id_product)
            product.delete()
            return Response(
                {"success": "Producto eliminado exitosamente"},
                status=status.HTTP_204_NO_CONTENT,
            )
        except Product.DoesNotExist:
            return Response(
                {"error": "El producto no existe"}, status=status.HTTP_404_NOT_FOUND
            )


class ProductImageView(APIView):
    """
    View for managing product images.
    """

    permission_classes = [IsAuthenticated]

    def delete(self, request, id):
        """
        Delete a product image based on the provided image ID.
        """
        product_id = request.query_params.get("product_id")
        product = get_object_or_404(Product, pk=product_id)
        image = get_object_or_404(ProductImage, pk=id, product=product)
        print("Por aqui tambien AKsdjkaosdajsdhjHDJHASJDHAJSHDJASHDji")
        image.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ProductCommentsView(APIView):
    """
    View for managing product comments.
    """

    permission_classes = [IsAuthenticated]

    def get(self, request, id_product):
        """
        Retrieve comments for a product based on the provided product ID.
        """
        product = get_object_or_404(Product, id_product=id_product)
        comments = product.product_comments.all().order_by("-date_posted")
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, id_product):
        """
        Create a new comment for a product based on the provided data.
        """
        try:
            product = get_object_or_404(Product, id_product=id_product)

            profile = request.user.profile

            comment_text = request.data

            serializer_data = {
                "product": product.id_product,
                "author": profile.id_profile,
                "content": comment_text,
            }

            serializer = CreateCommentSerializer(data=serializer_data)

            if serializer.is_valid():
                serializer.save()
                comment = Comment.objects.get(id=serializer.data["id"])
                comment_serializer = CommentSerializer(comment)

                return Response(comment_serializer.data, status=status.HTTP_201_CREATED)
            else:
                print("Serializer errors:", serializer.errors)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print("An exception occurred:", str(e))
            return Response(
                {"error": "An internal server error occurred."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    def delete(self, request, id_comment):
        """
        Delete a comment based on the provided comment ID.
        """
        comment = get_object_or_404(Comment, pk=id_comment)
        if request.user.profile != comment.author:
            return Response(
                {"detail": "No tienes permiso para eliminar este comentario."},
                status=status.HTTP_403_FORBIDDEN,
            )
        comment.delete()

        # Obtenemos la lista actualizada de comentarios
        product_id = comment.product.id_product
        product = get_object_or_404(Product, id_product=product_id)
        comments = product.product_comments.all().order_by("-date_posted")
        serializer = CommentSerializer(comments, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
