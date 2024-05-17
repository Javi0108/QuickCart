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

  shouldShowIonContentValue: boolean = this.shouldShowIonContent();

  shopData: ShopData | undefined;
  shopId: number | undefined;
  showSections: boolean = true;
  showCatalog: boolean = false;
  showAbout: boolean = false;

  sections: Section[] = [];

  public window: Window = window;
  constructor(
    private route: ActivatedRoute,
    private shopService: ShopService,
  ) { }

  ngOnInit() {
    const shopIdString = this.route.snapshot.paramMap.get('id');
    console.log("ds", shopIdString)
    if (shopIdString) {
      this.shopId = +shopIdString;
      this.getShop();
    } else {
      console.error('No se proporcionó un ID de tienda válido.');
    }
  }

  shouldShowIonContent() {
    return window.location.pathname.includes('web-page-edit');
  }

  getShop() {
    this.shopService.getShopById(this.shopId!).subscribe({
      next: (shopData) => {
        this.shopData = shopData.shop_data;
        if (this.shopData) {
          this.sections = shopData.sections;
          this.setEditModeForSections();
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

  changePageShow(option: string) {

    if (option == 'home') {
      this.showSections = true;
      this.showCatalog = false;
      this.showAbout = false;
    } else if (option == 'catalog') {
      this.showCatalog = true;
      this.showSections = false;
      this.showAbout = false;
    }else if(option == 'about'){
      this.showAbout = true;
      this.showCatalog = false;
      this.showSections = false;
    }
  }
}
