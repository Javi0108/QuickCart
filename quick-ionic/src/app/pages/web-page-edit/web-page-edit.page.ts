import { Section } from './../../interfaces/section.interface';
import { ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { catchError, finalize, forkJoin, of } from 'rxjs';
import { Product } from 'src/app/interfaces/product.interface';
import { defaultSectionAboutOfData, defaultSectionBannersData, defaultSectionHeroData, defaultSectionProductsData } from 'src/app/interfaces/sections-default';
import { NotificationToastService } from 'src/app/services/notification-toast.service';
import { ProductService } from 'src/app/services/product.service';
import { SectionEventService } from 'src/app/services/section-event.service';
import { ShopService } from 'src/app/services/shop.service';
import { environment } from 'src/environments/environment';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-web-page-edit',
  templateUrl: './web-page-edit.page.html',
  styleUrls: ['./web-page-edit.page.scss'],
})
export class WebPageEditPage implements OnInit {

  @ViewChild('popoverContent', { static: false }) popoverContent: any;

  public showMenu: boolean = true;

  shopData!: any;
  shopId!: number;

  sectionsCopy: Section[] = [];
  sections: Section[] = [];
  products: Product[] = [];

  selectedMode: string = "edit";

  saving: Boolean = false;

  //personalwebstyles
  personalWebStylesActive: boolean = false;
  personalWebStyles: string = "";


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private shopService: ShopService,
    private sectionEventService: SectionEventService,
    private productService: ProductService,
    private notificationToastService: NotificationToastService,
    private popoverController: PopoverController,
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.router.url.includes('/web-page-edit')) {
          // Verificar si las secciones han sido modificadas
          if (this.areSectionsModified()) {
            if (!confirm('Are you sure you want to leave? Your changes may not be saved.')) {
              // Cancelar la navegación si el usuario elige quedarse
              this.router.navigate([], { skipLocationChange: true });
            }
          }
        }
      }
    });

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
    } else if (sectionType === 'about-of-1') {
      const copiedData = { ...defaultSectionAboutOfData };
      const copiedContent = { ...copiedData.content, type: 1 };
      newSection = { provitionalId: id, id: undefined, type: "about-of", editMode: true, data: { ...copiedData, content: copiedContent }, products: this.products };
    } else if (sectionType === 'about-of-2') {
      const copiedData = { ...defaultSectionAboutOfData };
      const copiedContent = { ...copiedData.content, type: 2 };
      newSection = { provitionalId: id, id: undefined, type: "about-of", editMode: true, data: { ...copiedData, content: copiedContent }, products: this.products };
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
            'error',
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
          img: environment.backend + product.avatar
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


  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: this.popoverContent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.areSectionsModified()) {
      $event.returnValue = true;
    }
  }

  ionViewWillEnter() {
    this.showMenu = true;
  }

  ionViewWillLeave(): void {
    this.showMenu = false;
    this.changeDetector.detectChanges();
  }
}
