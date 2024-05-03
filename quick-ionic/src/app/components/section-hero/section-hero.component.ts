import { SectionEventService } from 'src/app/services/section-event.service';
import { HeroSectionData, Section } from './../../interfaces/section.interface';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IonModal } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { Item, TypeaheadComponent } from '../typeahead/typeahead.component';
import { Product } from 'src/app/interfaces/product.interface';
import { EditSectionModalComponent } from '../edit-section-modal/edit-section-modal.component';

@Component({
  selector: 'app-section-hero',
  templateUrl: './section-hero.component.html',
  styleUrls: ['./section-hero.component.scss'],
})
export class SectionHeroComponent implements OnInit {

  @Input() shopId!: number;
  @Input() section: any;
  @Input() order!: number;

  editMode: boolean = false;
  showOptions: boolean = false;

  sectionId?: number;
  sectionType?: string;
  sectionData?: HeroSectionData;
  products: Item[] = [];

  sectionFormBackground!: FormGroup;
  sectionFormBannerOne!: FormGroup;
  sectionFormBannerTwo!: FormGroup;
  sectionFormBannerThree!: FormGroup;

  selectedSegment: 'banner_1' | 'banner_2' | 'banner_3' = 'banner_1';
  selectedProductBannerOneText = 'Select a Related Product';
  selectedProductBannerTwoText = 'Select a Related Product';
  selectedProductBannerThreeText = 'Select a Related Product';
  selectedProductBannerOne: string | null = null;
  selectedProductBannerTwo: string | null = null;
  selectedProductBannerThree: string | null = null;



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

      if (this.section.data.defaultSectionHeroData) {
        this.sectionData = this.section.data.defaultSectionHeroData
      } else {
        this.sectionData = this.section.data
      }
    }

    if (this.editMode) {
      this.initializeEditMode()
    }

  }

  initializeEditMode() {

    this.sectionFormBackground = new FormGroup({
      image: new FormControl(this.sectionData?.background.image),
      overlay_opacity: new FormControl(this.sectionData?.background.overlay_opacity),
      fixed_background: new FormControl(this.sectionData?.background.fixed_background),
      hex_color: new FormControl(this.sectionData?.background.hex_color),
    });

    this.sectionFormBannerOne = new FormGroup({
      subtitle: new FormControl(this.sectionData?.banner_1.subtitle),
      title: new FormControl(this.sectionData?.banner_1.title),
      content: new FormControl(this.sectionData?.banner_1.content),
      price_text: new FormControl(this.sectionData?.banner_1.price_text),
      price: new FormControl(this.sectionData?.banner_1.price),
      button: new FormControl(this.sectionData?.banner_1.button),
      image: new FormControl(this.sectionData?.banner_1.image)
    });

    this.sectionFormBannerTwo = new FormGroup({
      subtitle: new FormControl(this.sectionData?.banner_2.subtitle),
      title: new FormControl(this.sectionData?.banner_2.title),
      price: new FormControl(this.sectionData?.banner_2.price),
      image: new FormControl(this.sectionData?.banner_2.image)
    });

    this.sectionFormBannerThree = new FormGroup({
      title: new FormControl(this.sectionData?.banner_3.title),
      content: new FormControl(this.sectionData?.banner_3.content),
      button: new FormControl(this.sectionData?.banner_3.button),
      image: new FormControl(this.sectionData?.banner_3.image)
    });

    this.sectionFormBackground.valueChanges.subscribe((values) => {
      this.sectionData!.background = { ...this.sectionData!.background, ...values };
    });

    this.sectionFormBannerOne.valueChanges.subscribe((values) => {
      this.sectionData!.banner_1 = { ...this.sectionData!.banner_1, ...values };
    });

    this.sectionFormBannerTwo.valueChanges.subscribe((values) => {
      this.sectionData!.banner_2 = { ...this.sectionData!.banner_2, ...values };
    });

    this.sectionFormBannerThree.valueChanges.subscribe((values) => {
      this.sectionData!.banner_3 = { ...this.sectionData!.banner_3, ...values };
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
    } else {
      this.selectedProductBannerThree = selectedValue;
    }

    const product = this.products.find((product) => product.value === selectedValue);

    if (this.selectedSegment == 'banner_1') {
      this.selectedProductBannerOneText = product ? product.text : 'No selection';
    } else if (this.selectedSegment == 'banner_2') {
      this.selectedProductBannerTwoText = product ? product.text : 'No selection';
    } else {
      this.selectedProductBannerThreeText = product ? product.text : 'No selection';
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
}
