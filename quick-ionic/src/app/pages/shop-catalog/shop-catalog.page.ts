import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interfaces/product.interface';
import { Section } from 'src/app/interfaces/section.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-shop-catalog',
  templateUrl: './shop-catalog.page.html',
  styleUrls: ['./shop-catalog.page.scss'],
})
export class ShopCatalogPage implements OnInit {
  //@Input() provitionalProducts: Product[] = [];
  products: Product[] = [];
  shopId!: number;


  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.shopId = + params['id'];
      console.log('ID de la tienda:', this.shopId); // Agregado
      this.loadProducts(this.shopId);
    });
  }

  loadProducts(shopId: number) {
    this.productService.getShopProducts(shopId).subscribe(
      (response) => {
        this.products = response;
        console.log('Productos cargados:', this.products); // Agregado
      },
      (error) => {
        console.error('Error al cargar los productos:', error);
      }
    );
  }

  addToCart(products: Product) {
    return null;
  }

}
