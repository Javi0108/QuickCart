import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Section } from 'src/app/interfaces/section.interface';
import { Shop, ShopData } from 'src/app/interfaces/shop.interface';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-web-page',
  templateUrl: './web-page.page.html',
  styleUrls: ['./web-page.page.scss'],
})
export class WebPagePage implements OnInit {
  shopData: ShopData | undefined;
  shopId: number | undefined;

  sections: Section[] = [];

  constructor(private route: ActivatedRoute, private shopService: ShopService) { }

  ngOnInit() {
    const shopIdString = this.route.snapshot.paramMap.get('id');
    if (shopIdString) {
      this.shopId = +shopIdString;
      this.getShop();
    } else {
      console.error('No se proporcionó un ID de tienda válido.');
    }
  }

  getShop() {
    this.shopService.getShopById(this.shopId!).subscribe({
      next: (shopData) => {
        this.shopData = shopData;
        if (!this.shopData) {
          console.error('No se encontró la tienda con el ID proporcionado.');
        } else {
          this.sections = shopData.sections;
          this.setEditModeForSections();
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


}
