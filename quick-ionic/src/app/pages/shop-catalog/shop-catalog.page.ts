import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-shop-catalog',
  templateUrl: './shop-catalog.page.html',
  styleUrls: ['./shop-catalog.page.scss'],
})
export class ShopCatalogPage implements OnInit {
  products: Product[] = [];
  shopId!: number;

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.shopId =+ params['id']; // +params['shopId'] convierte el parámetro a número
      this.loadProducts(this.shopId); // Cargar productos usando el shopId
    });
  }

  loadProducts(shopId: number) {
    this.productService.getShopProducts(shopId).subscribe(
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