import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interfaces/product.interface';
import { Section } from 'src/app/interfaces/section.interface';
import { Shop, ShopData } from 'src/app/interfaces/shop.interface';
import { ProductService } from 'src/app/services/product.service';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-web-page',
  templateUrl: './web-page.page.html',
  styleUrls: ['./web-page.page.scss'],
})
export class WebPagePage implements OnInit {

  shopData: ShopData | undefined;
  shopId: number | undefined;
  showSections: boolean = true;
  showCatalog: boolean = false;

  sections: Section[] = [];
  products: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private shopService: ShopService,
    private productService: ProductService
  ) { }

  ngOnInit() {
    const shopIdString = this.route.snapshot.paramMap.get('id');
    if (shopIdString) {
      this.shopId = +shopIdString;
      this.getShop();
      //this.loadProducts();
    } else {
      console.error('No se proporcionó un ID de tienda válido.');
    }
  }

  getShop() {
    this.shopService.getShopById(this.shopId!).subscribe({
      next: (shopData) => {
        this.shopData = shopData.shop_data;
        console.log('Datos de la tienda:', this.shopData); // Agregado
        if (this.shopData) {
          this.sections = shopData.sections;
          this.setEditModeForSections();
          console.log('Secciones:', this.sections); // Agregado
        } else {
          console.error('No se encontró la tienda con el ID proporcionado.');
        }
      },
      error: (error) => {
        console.error('Error al obtener los datos de la tienda:', error);
      }
    });
  }

  setEditModeForSections() {
    this.sections.forEach((section: Section) => {
      section.editMode = false;
    });
  }

  // loadProducts() {
  //   this.productService.getShopProducts(this.shopId!).subscribe({
  //     next: (response) => {
  //       this.products = response;
  //       console.log('Productos cargados:', this.products); // Agregado
  //     },
  //     error: (error) => {
  //       console.error('Error al cargar los productos:', error);
  //     }
  //   });
  // }

  changePageShow(option: string) {
    console.log('Cambiar página a:', option); // Agregado
    if (option == 'home') {
      this.showSections = true;
      this.showCatalog = false;
    } else if (option == 'catalog') {
      this.showSections = false;
      this.showCatalog = true;
    }
    console.log('showSections:', this.showSections); // Agregado
    console.log('showCatalog:', this.showCatalog); // Agregado
  }
}
