import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Item, TypeaheadComponent } from '../typeahead/typeahead.component';
import { BannersSectionData, Section } from 'src/app/interfaces/section.interface';
import { FormControl, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { SectionEventService } from 'src/app/services/section-event.service';
import { EditSectionModalComponent } from '../edit-section-modal/edit-section-modal.component';

@Component({
  selector: 'app-section-banners',
  templateUrl: './section-banners.component.html',
  styleUrls: ['./section-banners.component.scss'],
})
export class SectionBannersComponent implements OnInit {

  @Input() shopId!: number;
  @Input() section: any;
  @Input() order!: number;

  editMode: boolean = false;
  showOptions: boolean = false;

  sectionId?: number;
  sectionType?: string;
  sectionData?: BannersSectionData;
  products: Item[] = [];

  sectionFormBannerOne!: FormGroup;
  sectionFormBannerTwo!: FormGroup;

  selectedSegment: 'banner_1' | 'banner_2' = 'banner_1';
  selectedProductBannerOneText = 'Select a Related Product';
  selectedProductBannerTwoText = 'Select a Related Product';
  selectedProductBannerOne: string | null = null;
  selectedProductBannerTwo: string | null = null;

  constructor(
    private sectionEventService: SectionEventService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    if (this.section) {
      this.sectionId = this.section.id
      this.sectionType = this.section.type
      this.editMode = this.section.editMode
      this.products = this.section.products

      if (this.section.data.defaultSectionBannersData) {
        this.sectionData = this.section.data.defaultSectionBannersData
      } else {
        this.sectionData = this.section.data
      }
    }

    if (this.editMode) {
      this.initializeEditMode()
    }
  }


  initializeEditMode() {
    this.sectionFormBannerOne = new FormGroup({
      title: new FormControl(this.sectionData?.banner_1.title),
      content: new FormControl(this.sectionData?.banner_1.content),
      button: new FormControl(this.sectionData?.banner_1.button),
      image: new FormControl(this.sectionData?.banner_1.image)
    });

    this.sectionFormBannerTwo = new FormGroup({
      title: new FormControl(this.sectionData?.banner_2.title),
      content: new FormControl(this.sectionData?.banner_2.content),
      button: new FormControl(this.sectionData?.banner_2.button),
      image: new FormControl(this.sectionData?.banner_2.image)
    });

    this.sectionFormBannerOne.valueChanges.subscribe((values) => {
      this.sectionData!.banner_1 = { ...this.sectionData!.banner_1, ...values };
    });

    this.sectionFormBannerTwo.valueChanges.subscribe((values) => {
      this.sectionData!.banner_2 = { ...this.sectionData!.banner_2, ...values };
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.convertFileToDataURL(file);
    }
  }

  convertFileToDataURL(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      const imageUrl: string = reader.result as string;
      if (this.sectionData && this.sectionData[this.selectedSegment]) {
        this.sectionData[this.selectedSegment].image = imageUrl;
      }
    };
    reader.readAsDataURL(file);
  }

  productSelectionChanged(selectedValue: string | null) {

    this.sectionData![this.selectedSegment].related_product = selectedValue;

    if (this.selectedSegment == 'banner_1') {
      this.selectedProductBannerOne = selectedValue;
    } else if (this.selectedSegment == 'banner_2') {
      this.selectedProductBannerTwo = selectedValue;
    }

    const product = this.products.find((product) => product.value === selectedValue);

    if (this.selectedSegment == 'banner_1') {
      this.selectedProductBannerOneText = product ? product.text : 'No selection';
    } else if (this.selectedSegment == 'banner_2') {
      this.selectedProductBannerTwoText = product ? product.text : 'No selection';
    }
  }

  async openModal() {

    const modal = await this.modalController.create({
      component: TypeaheadComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        'shopId': this.shopId,
        'items': this.products,
        'selectedItem': this.selectedProductBannerOne,
        'title': 'Select a Related Product',
        'selectionChange': this.productSelectionChanged.bind(this),
        'selectionCancel': () => modal.dismiss()
      }
    });

    modal.onDidDismiss().then((data) => {
      if (data.role === 'confirm') {
        const selectedItem = data.data;
        this.productSelectionChanged(selectedItem)
      }
    });

    await modal.present();
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

  segmentChanged(event: CustomEvent) {
    this.selectedSegment = event.detail.value;
  }

  toggleOptions() {
    this.showOptions = !this.showOptions;
  }

  async optionsSection() {
    const modal = await this.modalController.create({
      component: EditSectionModalComponent,
      componentProps: {},
    });

    modal.onDidDismiss().then((data) => {
      if (data.role === 'confirm') {
        const modalData = data.data;
      }
    });

    return await modal.present();
  }

}
