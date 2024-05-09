import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductService } from 'src/app/services/product.service';
import { IonInput } from '@ionic/angular';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit, AfterViewInit {
  selectedImage: string | null = null;
  productId!: number;
  productData!: Product;
  @ViewChild('quantity') quantity!: IonInput;
  quantity_value: number = 1;

  constructor(private route: ActivatedRoute, private productService: ProductService, private orderService: OrderService) {

  }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id')
    if (productId) {
      this.productId = + productId;
      this.getProduct();
    } else {
      console.error("Invalid Product ID")
    }
  }

  ngAfterViewInit(): void {
  }

  getProduct() {
    this.productService.getProductById(this.productId).subscribe({
      next: (productData: Product) => {
        this.productData = productData;
        this.selectedImage = this.productData.avatar
        if (!this.productData) {
          console.error('No se encontró el producto con el ID proporcionado.');
        }
      },
      error: (error) => {
        console.error('Error al obtener los datos del producto:', error);
      }
    });
  }

  selectImage(image: string) {
    this.selectedImage = image;
  }

  addToCart() {
    this.quantity_value = Number(this.quantity.value);
    this.orderService.addProductToOrder(this.productId, this.quantity_value).subscribe({
      next(response) {
        console.log("Producto añadido correctamente al carrito")
      },
      error(error) {
        console.error('Error al obtener los datos del pedido/producto:', error);
      },
    });
  }


}