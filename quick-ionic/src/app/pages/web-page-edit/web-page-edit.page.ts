import { HeroSectionData, Section } from './../../interfaces/section.interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { defaultSectionHeroData } from 'src/app/interfaces/sections-default';
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

  constructor(private route: ActivatedRoute, private shopService: ShopService, private sectionEventService: SectionEventService) { }

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

    this.sectionEventService.sectionEdited.subscribe((section: Section) => {
      this.updateSection(section);
    })
  }

  getShop() {
    this.shopService.getShopById(this.shopId!).subscribe({
      next: (shopData) => {
        console.log(shopData);
        this.shopData = shopData;
        if (!this.shopData) {
          console.error('No se encontró la tienda con el ID proporcionado.');
        } else {
          this.sections = shopData.sections;
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
      console.log(defaultSectionHeroData)
      newSection = { id: undefined, type: sectionType, data: { defaultSectionHeroData }};
    } else if (sectionType === 'products') {
      newSection = { id: undefined, type: sectionType, data: {} };
    } else {
      newSection = { id: undefined, type: "", data: {} };
    }
    this.sections.push(newSection);
    console.log(this.sections)
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

  updateSection(section: Section) {
    console.log(section)
    this.shopService.updateShopSection(section.id!, section).subscribe({
      next: (shopData) => {
        console.log("Guardado Correctamente", shopData)
      },
      error: (error) => {
        console.error("no se ha guardado correctamente", error)
      }

    })
  }
}
