import { Component, Input, OnInit } from '@angular/core';
import { Item, TypeaheadComponent } from '../typeahead/typeahead.component';
import { ProductsSectionData } from 'src/app/interfaces/section.interface';
import { Product } from 'src/app/interfaces/product.interface';
import { SectionEventService } from 'src/app/services/section-event.service';
import { ModalController } from '@ionic/angular';
import { EditSectionModalComponent } from '../edit-section-modal/edit-section-modal.component';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-section-products',
  templateUrl: './section-products.component.html',
  styleUrls: ['./section-products.component.scss'],
})
export class SectionProductsComponent implements OnInit {

  @Input() shopId!: number;
  @Input() section: any;
  @Input() order!: number;

  editMode: boolean = false;
  showOptions: boolean = false;

  sectionId?: number;
  sectionType?: string;
  sectionData?: ProductsSectionData;
  productsData: Product[] = [];
  productsItem: any[] = [];
  productsSelected: number[] = [];
  allProducts: Product[] = [];

  constructor(
    private sectionEventService: SectionEventService,
    private productService: ProductService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.sectionId = this.section.id;
    this.sectionType = this.section.type;
    this.editMode = this.section.editMode;
    this.productsItem = this.section.products;


    this.loadProducts();
    
    if (this.section.data.defaultSectionProductsData) {
      this.sectionData = this.section.data.defaultSectionProductsData;
    } else {
      this.sectionData = this.section.data;
    }
  }

  async addProduct() {
    const modal = await this.modalController.create({
      component: TypeaheadComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        'shopId': this.shopId,
        'items': this.productsItem.filter(product => !this.productsSelected.includes(Number(product.value))), // Filtrar los productos no seleccionados
        'title': 'Select a Related Product',
        'selectionCancel': () => modal.dismiss()
      }
    });

    modal.onDidDismiss().then((data) => {
      if (data.role === 'confirm') {
        const selectedItem = parseInt(data.data, 10);
        this.productsSelected.push(selectedItem);
        this.filterProducts()
      }
    });

    await modal.present();
  }

  async optionsSection() {
    const modal = await this.modalController.create({
      component: EditSectionModalComponent,
      componentProps: {
        'image': this.sectionData!.background.image,
        'overlay_opacity': this.sectionData!.background.overlay_opacity,
        'fixed_background': this.sectionData!.background.fixed_background,
        'hex_color': this.sectionData!.background.hex_color
      },
    });

    modal.onDidDismiss().then((data) => {
      if (data.role === 'confirm') {
        const modalData = data.data;
        this.sectionData!.background = { ...this.sectionData!.background, ...modalData };
      }
    });

    return await modal.present();
  }

  loadProducts() {
    this.productService.getShopProducts(this.shopId).subscribe(
      (response) => {
        this.allProducts = response;
        if(this.sectionData){
          this.productsSelected = this.sectionData.products.map(product => product.id_product);
          this.productsData = this.allProducts.filter(product => this.productsSelected.includes(product.id_product));
        }
      },
      (error) => {
        console.error('Error loading products:', error);
      }
    );
  }

  deleteProduct(productId: number) {
    this.productsData = this.productsData.filter(product => product.id_product !== productId);
    this.sectionData!.products = this.sectionData!.products.filter(product => product.id_product !== productId);
    this.productsSelected = this.productsSelected.filter(id => id !== productId);
  }
  

  filterProducts() {
    this.productsData = this.allProducts.filter(product => this.productsSelected.includes(product.id_product));
    this.sectionData!.products = this.productsData;
  }

  moveSectionUp() {
    this.sectionEventService.moveSectionUp.emit(this.order);
  }

  moveSectionDown() {
    this.sectionEventService.moveSectionDown.emit(this.order);
  }

  deleteSection() {
    this.sectionEventService.deleteSection.emit(this.sectionId);
  }

  toggleOptions() {
    this.showOptions = !this.showOptions;
  }

}
