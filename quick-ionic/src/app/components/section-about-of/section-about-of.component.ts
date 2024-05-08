import { Component, Input, OnInit } from '@angular/core';
import { AboutOfSectionData } from 'src/app/interfaces/section.interface';
import { Item, TypeaheadComponent } from '../typeahead/typeahead.component';
import { FormControl, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { SectionEventService } from 'src/app/services/section-event.service';
import { EditSectionModalComponent } from '../edit-section-modal/edit-section-modal.component';

@Component({
  selector: 'app-section-about-of',
  templateUrl: './section-about-of.component.html',
  styleUrls: ['./section-about-of.component.scss'],
})
export class SectionAboutOfComponent implements OnInit {

  @Input() shopId!: number;
  @Input() section: any;
  @Input() order!: number;

  editMode: boolean = false;
  showOptions: boolean = false;

  sectionId?: number;
  sectionType?: string;
  sectionData?: AboutOfSectionData;
  products: Item[] = [];

  sectionFormBackground!: FormGroup;
  sectionFormContent!: FormGroup;

  selectedProductText = 'Select a Related Product';
  selectedProduct: string | null = null;

  constructor(
    private sectionEventService: SectionEventService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    if (this.section) {
      this.sectionId = this.section.id;
      this.sectionType = this.section.type;
      this.editMode = this.section.editMode;
      this.products = this.section.products;

      if (this.section.data.defaultSectionBannersData) {
        this.sectionData = this.section.data.defaultSectionBannersData;
      } else {
        this.sectionData = this.section.data;
      }
    }

    if (this.editMode) {
      this.initializeEditMode();
    }
  }

  initializeEditMode() {

    this.sectionFormBackground = new FormGroup({
      image: new FormControl(this.sectionData?.background.image),
      overlay_opacity: new FormControl(this.sectionData?.background.overlay_opacity),
      fixed_background: new FormControl(this.sectionData?.background.fixed_background),
      hex_color: new FormControl(this.sectionData?.background.hex_color),
    });

    this.sectionFormContent = new FormGroup({
      subtitle: new FormControl(this.sectionData?.content.subtitle),
      title: new FormControl(this.sectionData?.content.title),
      paragraph: new FormControl(this.sectionData?.content.paragraph),
      image: new FormControl(this.sectionData?.content.image)
    });

    this.sectionFormBackground.valueChanges.subscribe((values) => {
      this.sectionData!.background = { ...this.sectionData!.background, ...values };
    });

    this.sectionFormContent.valueChanges.subscribe((values) => {
      this.sectionData!.content = { ...this.sectionData!.content, ...values };
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
      if (this.sectionData) {
        this.sectionData.content.image = imageUrl;
      }
    };
    reader.readAsDataURL(file);
  }

  async openModal() {

    const modal = await this.modalController.create({
      component: TypeaheadComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        'shopId': this.shopId,
        'items': this.products,
        'selectedItem': this.selectedProduct,
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

  productSelectionChanged(selectedValue: string | null) {

    this.sectionData!.content.related_product = selectedValue;
    const product = this.products.find((product) => product.value === selectedValue);
    this.selectedProduct = selectedValue;
    this.selectedProductText = product ? product.text : 'No selection';

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

  toggleOptions() {
    this.showOptions = !this.showOptions;
  }

}
