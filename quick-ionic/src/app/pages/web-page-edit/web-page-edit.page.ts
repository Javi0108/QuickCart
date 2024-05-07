import { Section } from './../../interfaces/section.interface';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, finalize, forkJoin, of } from 'rxjs';
import { Product } from 'src/app/interfaces/product.interface';
import { defaultSectionBannersData, defaultSectionHeroData, defaultSectionProductsData } from 'src/app/interfaces/sections-default';
import { NotificationToastService } from 'src/app/services/notification-toast.service';
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

  shopData!: any;
  shopId!: number;

  sectionsCopy: Section[] = [];
  sections: Section[] = [];
  products: Product[] = [];

  selectedMode: string = "edit";

  saving: Boolean = false;


  constructor(
    private route: ActivatedRoute,
    private shopService: ShopService,
    private sectionEventService: SectionEventService,
    private productService: ProductService,
    private notificationToastService: NotificationToastService
  ) { }

  ngOnInit() {

    const shopIdString = this.route.snapshot.paramMap.get('id');
    if (shopIdString) {
      this.shopId = +shopIdString;
      this.loadProducts(this.shopId);
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

  segmentChanged(segment: string) {
    this.selectedMode = segment;
  }

  getShop() {
    this.shopService.getShopById(this.shopId!).subscribe({
      next: (shopData) => {
        this.shopData = shopData;
        if (this.shopData) {
          this.sections = shopData.sections;
          this.setEditModeForSections();
          this.loadProductsForSections();
          this.sectionsCopy = JSON.parse(JSON.stringify(this.sections));
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
      newSection = { provitionalId: id, id: undefined, type: sectionType, editMode: true, data: { ...defaultSectionHeroData }, products: this.products };
    } else if (sectionType === 'banners') {
      newSection = { provitionalId: id, id: undefined, type: sectionType, editMode: true, data: { ...defaultSectionBannersData }, products: this.products };
    } else if (sectionType === 'products') {
      newSection = { provitionalId: id, id: undefined, type: sectionType, editMode: true, data: { ...defaultSectionProductsData }, products: this.products };
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
    this.saving = true;

    if (this.sections.length === 0) {
      return;
    }

    const requests = this.sections.map((section: Section, index: number) => {
      if (section.id) {
        return this.updateSection(section, index);
      } else {
        return this.saveSection(section, index);
      }
    });

    forkJoin(requests)
      .pipe(
        catchError(error => {
          this.notificationToastService.presentToast(
            'It seems there was an issue while trying to save the changes. Some sections could not be saved correctly. Please try again later. If the issue persists, please contact technical support.',
            'success',
            '../../assets/check.svg'
          );
          return of(null);
        }),
        finalize(() => {
          this.notificationToastService.presentToast(
            'Shop successfully updated',
            'success',
            '../../assets/check.svg'
          );
          this.saving = false;
        })
      )
      .subscribe(() => {
        this.sectionsCopy = JSON.parse(JSON.stringify(this.sections));
      });
  }

  saveSection(section: Section, order: number) {
    return this.shopService.saveShopSection(this.shopId, order, section);
  }

  updateSection(section: Section, order: number) {
    return this.shopService.updateShopSection(section.id!, order, section);
  }

  // saveAllSections() {

  //   this.saving = true

  //   if (this.sections.length === 0) {
  //     return;
  //   }

  //   let order = 0;

  //   this.sections.forEach((section: Section) => {
  //     if (section.id) {
  //       this.updateSection(section, order);
  //     } else {
  //       this.saveSection(section, order);
  //     }
  //     order++
  //   });

  //   this.sectionsCopy = JSON.parse(JSON.stringify(this.sections));
  // }

  // saveSection(section: Section, order: number) {
  //   this.shopService.saveShopSection(this.shopId, order, section).subscribe({
  //     next: (shopData) => {
  //       this.getShop()
  //     },
  //     error: (error) => {
  //       console.error("Error al guarda la seccion", error)
  //     }
  //   })
  // }

  // updateSection(section: Section, order: number) {
  //   this.shopService.updateShopSection(section.id!, order, section).subscribe({
  //     next: (shopData) => { },
  //     error: (error) => {
  //       console.error("no se ha guardado correctamente", error)
  //     }
  //   })
  // }

  deleteSection(id: number) {
    if (id > 0) {
      this.shopService.deleteShopSection(id).subscribe({
        next: (data) => {
          const index = this.sections.findIndex(s => s.id === id);
          if (index !== -1) {
            this.sections.splice(index, 1);
          }
          this.notificationToastService.presentToast(
            'Section successfully deleted',
            'success',
            '../../assets/check.svg'
          );
        },
        error: (err) => {
          this.notificationToastService.presentToast(
            'An error occurred while delete the section',
            'danger',
            '../../assets/exclamation.svg'
          );
        },
      });
    } else {
      const index = this.sections.findIndex(s => s.id === id);
      if (index !== -1) {
        this.sections.splice(index, 1);
      }
      this.notificationToastService.presentToast(
        'Section successfully deleted',
        'success',
        '../../assets/check.svg'
      );
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
        this.getShop();
      },
      (error) => {
        console.error('Error loading products:', error);
      }
    );
  }

  areSectionsModified(): boolean {
    const modified = JSON.stringify(this.sections) !== JSON.stringify(this.sectionsCopy);
    return modified;
  }


}
