import { Section } from './../../interfaces/section.interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interfaces/product.interface';
import { defaultSectionBannersData, defaultSectionHeroData } from 'src/app/interfaces/sections-default';
import { ShopData } from 'src/app/interfaces/shop.interface';
import { ProductService } from 'src/app/services/product.service';
import { SectionEventService } from 'src/app/services/section-event.service';
import { ShopService } from 'src/app/services/shop.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-web-page-edit',
  templateUrl: './web-page-edit.page.html',
  styleUrls: ['./web-page-edit.page.scss'],
})
export class WebPageEditPage implements OnInit {

  shopData!: ShopData;
  shopId!: number;

  sections: Section[] = [];
  products: Product[] = [];

  selectedSegment: 'edit' | 'preview' = 'edit';


  constructor(
    private route: ActivatedRoute,
    private shopService: ShopService,
    private sectionEventService: SectionEventService,
    private productService: ProductService
  ) { }

  ngOnInit() {
    const shopIdString = this.route.snapshot.paramMap.get('id');
    if (shopIdString) {
      this.shopId = +shopIdString;
      this.loadProducts(this.shopId);
      this.getShop();
    } else {
      console.error('No se proporcionó un ID de tienda válido.');
    }

    this.sectionEventService.deleteSection.subscribe((id: number) => {
      this.deleteSection(id);
    })

    this.sectionEventService.moveSectionUp.subscribe((index: number) => {
      this.moveSectionUp(index);
    })

    this.sectionEventService.moveSectionDown.subscribe((index: number) => {
      this.moveSectionDown(index);
    })
  }

  segmentChanged(event: CustomEvent) {
    this.selectedSegment = event.detail.value;
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
          this.loadProductsForSections();
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

  loadProductsForSections() {
    this.sections.forEach((section: Section) => {
      section.products = this.products;
    });
  }

  addSection(sectionType: string) {
    const id = uuidv4();
    let newSection: Section;

    const order = this.sections.length;

    if (sectionType === 'hero') {
      newSection = { provitionalId: id, id: undefined, type: sectionType, editMode: true, data: { ...defaultSectionHeroData }, products: this.products};
    } else if (sectionType === 'banners') {
      newSection = { provitionalId: id, id: undefined, type: sectionType, editMode: true, data: { ...defaultSectionBannersData }, products: this.products};
    } else if (sectionType === 'products') {
      newSection = { provitionalId: id, id: undefined, type: sectionType, editMode: true, data: {}, products: this.products };
    } else {
      newSection = { provitionalId: id, id: undefined, type: "", editMode: true, data: {}, products: this.products };
    }

    this.sections.push(newSection);
  }

  moveSectionUp(index: number) {
    if (index > 0) {
      const temp = this.sections[index - 1];
      this.sections[index - 1] = this.sections[index];
      this.sections[index] = temp;
    }
  }
  
  moveSectionDown(index: number) {
    if (index < this.sections.length - 1) {
      const temp = this.sections[index + 1];
      this.sections[index + 1] = this.sections[index];
      this.sections[index] = temp;
    }
  }

  saveAllSections() {

    console.log(this.sections)
    if (this.sections.length === 0) {
      return;
    }

    let order = 0;

    this.sections.forEach((section: Section) => {
      if (section.id) {
        this.updateSection(section, order);
      } else {
        this.saveSection(section, order);
      }
      order++
    });
  }

  saveSection(section: Section, order: number) {
    this.shopService.saveShopSection(this.shopId, order, section).subscribe({
      next: (shopData) => {
        this.getShop()
      },
      error: (error) => {
        console.error("Error al guarda la seccion", error)
      }
    })
  }

  updateSection(section: Section, order: number) {
    this.shopService.updateShopSection(section.id!, order, section).subscribe({
      next: (shopData) => { },
      error: (error) => {
        console.error("no se ha guardado correctamente", error)
      }

    })
  }

  deleteSection(id: number) {
    if (id > 0) {
      this.shopService.deleteShopSection(id).subscribe({
        next: (data) => {
          const index = this.sections.findIndex(s => s.id === id);
          if (index !== -1) {
            this.sections.splice(index, 1);
          }
        }
      });
    } else {
      const index = this.sections.findIndex(s => s.id === id);
      if (index !== -1) {
        this.sections.splice(index, 1);
      }
    }
  }


  loadProducts(shopId: number) {
    this.productService.getShopProducts(shopId).subscribe(
      (response) => {
        this.products = response.map((product: Product) => ({
          text: product.name,
          value: product.id_product.toString(),
          img: "http://localhost:8000" + product.avatar
        }));
      },
      (error) => {
        console.error('Error loading products:', error);
      }
    );
  }


}
