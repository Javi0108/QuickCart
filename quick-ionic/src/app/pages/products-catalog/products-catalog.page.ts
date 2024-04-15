import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-catalog',
  templateUrl: './products-catalog.page.html',
  styleUrls: ['./products-catalog.page.scss'],
})
export class ProductsCatalogPage implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe(
      (response) => {
        this.products = response;
      },
      (error) => {
        console.error('Error loading products:', error);
      }
    );
  }

  addToCart(products: Product) {
    return null;
  }
}
