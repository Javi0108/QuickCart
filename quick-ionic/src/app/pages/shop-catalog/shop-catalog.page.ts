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
  @Input() shopName!: string;
  products: Product[] = [];
  shopId!: number;

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.shopId = + params['id'];
      this.loadProducts(this.shopId);
    });
  }

  loadProducts(shopId: number) {
    this.productService.getShopProducts(shopId).subscribe(
      (response) => {
        this.products = response;
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
