import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../typeahead/typeahead.component';
import { BannersSectionData } from 'src/app/interfaces/section.interface';
import { Product } from 'src/app/interfaces/product.interface';
import { SectionEventService } from 'src/app/services/section-event.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-section-products',
  templateUrl: './section-products.component.html',
  styleUrls: ['./section-products.component.scss'],
})
export class SectionProductsComponent  implements OnInit {

  @Input() shopId!: number;
  @Input() section: any;
  @Input() order!: number;

  editMode: boolean = false;
  showOptions: boolean = false;

  sectionId?: number;
  sectionType?: string;
  sectionData?: BannersSectionData;
  productsData: Product[] = [];
  products: Item[] = [];

  constructor(    
    private sectionEventService: SectionEventService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.sectionId = this.section.id
    this.sectionType = this.section.type
    this.editMode = this.section.editMode
    this.products = this.section.products

    if (this.section.data.defaultSectionProductsData) {
      this.sectionData = this.section.data.defaultSectionProductsData
    } else {
      this.sectionData = this.section.data
    }
  }

}
