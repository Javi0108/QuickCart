import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit{
  selectedImage: string | null = null;
  productId!: number;
  productData!: Product; 
   
  constructor(private route: ActivatedRoute, private productService: ProductService){
    
  } 

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id')
    if (productId) {
      this.productId =+ productId;
      this.getProduct();
    }else{
      console.error("Invalid Product ID")
    }
  }

  getProduct() {
    this.productService.getProductById(this.productId).subscribe({
      next: (productData: Product) => {
        this.productData = productData;
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
  }

  
}