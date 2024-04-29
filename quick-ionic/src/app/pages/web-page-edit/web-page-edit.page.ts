import { Section } from './../../interfaces/section.interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interfaces/product.interface';
import { defaultSectionBannersData, defaultSectionHeroData } from 'src/app/interfaces/sections-default';
import { ShopData } from 'src/app/interfaces/shop.interface';
import { ProductService } from 'src/app/services/product.service';
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
  products: Product[] = [];

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
    let newSection: Section;

    if (sectionType === 'hero') {
      newSection = { id: undefined, type: sectionType, editMode: true, data: { ...defaultSectionHeroData }, products: this.products };
    } else if (sectionType === 'banners') {
      newSection = { id: undefined, type: sectionType, editMode: true, data: { ...defaultSectionBannersData }, products: this.products };
    } else if (sectionType === 'products') {
      newSection = { id: undefined, type: sectionType, editMode: true, data: {}, products: this.products };
    } else {
      newSection = { id: undefined, type: "", editMode: true, data: {}, products: this.products };
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

  loadProducts(shopId: number) {
    this.productService.getShopProducts(shopId).subscribe(
      (response) => {
        this.products = response.map((product: Product) => ({
          text: product.name,
          value: product.id_product.toString(),
          img: "http://localhost:8000" + product.avatar
        }));
        console.log(this.products);
      },
      (error) => {
        console.error('Error loading products:', error);
      }
    );
  }


}
