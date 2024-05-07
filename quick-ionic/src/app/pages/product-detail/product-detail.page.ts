import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductService } from 'src/app/services/product.service';
import { IonInput } from '@ionic/angular';
import { CartService } from 'src/app/services/cart.service';

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

  constructor(private route: ActivatedRoute, private productService: ProductService, private cartService: CartService) {

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
        console.log(productData)
        if (!this.productData) {
          console.error('No se encontró el producto con el ID proporcionado.');
        }
      },
      error: (error) => {
        console.error('Error al obtener los datos del producto:', error);
      }
    });
  }

  selectImage(image: any) {
    this.selectedImage = image.img;
  }

  addToCart() {
    const quantity = Number(this.quantity.value);
    console.log('Cantidad:', quantity);
    if (this.productData) {
      this.cartService.addToCart(this.productData, quantity);
      console.log('Producto agregado al carrito:', this.productData.name);
      const carrito =this.cartService.getCartItems()
      console.log(carrito)
    }
  }


}