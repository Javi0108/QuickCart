import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../interfaces/product.interface';

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
}
