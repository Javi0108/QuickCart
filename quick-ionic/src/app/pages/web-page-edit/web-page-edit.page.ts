import { HeroSectionData, Section } from './../../interfaces/section.interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopData } from 'src/app/interfaces/shop.interface';
import { ShopService } from 'src/app/services/shop.service';
import { ChangeDetectorRef } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-web-page-edit',
  templateUrl: './web-page-edit.page.html',
  styleUrls: ['./web-page-edit.page.scss'],
})
export class WebPageEditPage implements OnInit {

  shopData!: ShopData;
  shopId!: number;

  sections: Section[] = [];

  constructor(private route: ActivatedRoute, private shopService: ShopService) {
  }

  ngOnInit() {
    const shopIdString = this.route.snapshot.paramMap.get('id');
    if (shopIdString) {
      this.shopId = +shopIdString;
      this.getShop(); // Llama al método para obtener los datos de la tienda
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
        }
      },
      error: (error) => {
        console.error('Error al obtener los datos de la tienda:', error);
      }
    });
  }


  addSection(sectionType: string) {
    let newSection: Section;

    if (sectionType === 'hero') {
      newSection = { type: sectionType, data: {} };
    } else if (sectionType === 'products') {
      newSection = { type: sectionType, data: {} };
    } else {
      newSection = { type: "", data: {} };
    }
    this.sections.push(newSection);
    console.log(this.sections)
    this.updateShopData();
  }

  editSection(event: any) {
    const index = event.index;
    const newData = event.newData;
  }


  deleteSection(index: number) {
    this.sections.splice(index, 1);
  }

  updateShopData() {

  }
}
