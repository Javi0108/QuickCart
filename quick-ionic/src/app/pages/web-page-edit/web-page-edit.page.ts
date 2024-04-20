import { HeroSectionData, Section } from './../../interfaces/section.interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopData } from 'src/app/interfaces/shop.interface';
import { SectionEventService } from 'src/app/services/section-event.service';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-web-page-edit',
  templateUrl: './web-page-edit.page.html',
  styleUrls: ['./web-page-edit.page.scss'],
})
export class WebPageEditPage implements OnInit {

  shopData!: ShopData;
  shopId!: number;

  sections: Section[] = [];

  constructor(private route: ActivatedRoute, private shopService: ShopService, private sectionEventService: SectionEventService) {}

  ngOnInit() {
    const shopIdString = this.route.snapshot.paramMap.get('id');
    if (shopIdString) {
      this.shopId = +shopIdString;
      this.getShop();
    } else {
      console.error('No se proporcionó un ID de tienda válido.');
    }


    this.sectionEventService.changeSaved.subscribe((section: Section) => {
      this.handleChangesSaved(section);
    });
  }

  getShop() {
    this.shopService.getShopById(this.shopId!).subscribe({
      next: (shopData) => {
        console.log(shopData);
        this.shopData = shopData;
        if (!this.shopData) {
          console.error('No se encontró la tienda con el ID proporcionado.');
        } else {
          this.sections = shopData.sections; // Asignar las secciones del objeto shopData a this.sections
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

  handleChangesSaved(section: Section) {

    this.shopService.saveShopSection(this.shopId, section).subscribe({
      next: (shopData) => {
        console.log("Guardado correctamente", shopData)
      },
      error: (error) => {
        console.error("Error al guarda la seccion", error)
      }
    })

    console.log('Sección guardada ahora mismo:', section);
  }
}
