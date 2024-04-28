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

    this.sectionEventService.deleteSection.subscribe((section: Section) => {
      this.deleteSection(section);
    })
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
      section.editMode = true;
    });
  }

  addSection(sectionType: string) {
    let newSection: Section;

    if (sectionType === 'hero') {
      newSection = { id: undefined, type: sectionType, editMode: true, data: { ...defaultSectionHeroData } };
    } else if (sectionType === 'products') {
      newSection = { id: undefined, type: sectionType, editMode: true, data: {} };
    } else {
      newSection = { id: undefined, type: "", editMode: true, data: {} };
    }

    this.sections.push(newSection);
    console.log(this.sections);
  }


  saveAllSections() {
    if (this.sections.length === 0) {
      console.log("No hay secciones para guardar.");
      return;
    }

    this.sections.forEach((section: Section) => {
      if (section.id) {
        this.updateSection(section);
      } else {
        this.saveSection(section);
      }
    });
  }

  saveSection(section: Section) {
    this.shopService.saveShopSection(this.shopId, section).subscribe({
      next: (shopData) => {
        console.log("Guardado correctamente", shopData)
        this.getShop()
      },
      error: (error) => {
        console.error("Error al guarda la seccion", error)
      }
    })
  }

  updateSection(section: Section) {
    this.shopService.updateShopSection(section.id!, section).subscribe({
      next: (shopData) => {
        console.log("Actualizado Correctamente", shopData)
      },
      error: (error) => {
        console.error("no se ha guardado correctamente", error)
      }

    })
  }

  deleteSection(section: Section) {
    if (section.id) {
      this.shopService.deleteShopSection(section.id).subscribe({
        next: (data) => {
          const index = this.sections.findIndex(s => s.id === section.id);
          if (index !== -1) {
            this.sections.splice(index, 1);
          }
        }
      });
    } else {
      const index = this.sections.indexOf(section);
      console.log(index, section)
      if (index !== -1) {
        this.sections.splice(index, 1);
      }
    }
  }

}
