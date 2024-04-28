import { SectionEventService } from 'src/app/services/section-event.service';
import { HeroSectionData, Section } from './../../interfaces/section.interface';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Product } from 'src/app/interfaces/product.interface';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-section-hero',
  templateUrl: './section-hero.component.html',
  styleUrls: ['./section-hero.component.scss'],
})
export class SectionHeroComponent implements OnInit {

  @ViewChild('modal', { static: true }) modal!: IonModal;
  @Input() section: any;

  editMode: boolean = false;

  sectionId?: number;
  sectionType?: string;
  sectionData?: HeroSectionData;

  sectionFormBannerOne!: FormGroup;
  sectionFormBannerTwo!: FormGroup;
  sectionFormBannerThree!: FormGroup;

  selectedSegment: 'banner_1' | 'banner_2' | 'banner_3' = 'banner_1';

  selectedProductText = 'Releated Product';
  selectedProduct: string | null = null;

  products: any[] = [
    { text: 'Apple', value: '1', img: "https://123cuidatuhogar.com/wp-content/uploads/2019/07/LAVALOZA-ENVASE-RECUPERADO-500-ML.png" },
    { text: 'Apricot', value: '2' , img: "https://123cuidatuhogar.com/wp-content/uploads/2019/07/LAVALOZA-ENVASE-RECUPERADO-500-ML.png" },
    { text: 'Banana', value: '3' , img: "https://123cuidatuhogar.com/wp-content/uploads/2019/07/LAVALOZA-ENVASE-RECUPERADO-500-ML.png" },
    { text: 'Blackberry', value: '4' , img: "https://123cuidatuhogar.com/wp-content/uploads/2019/07/LAVALOZA-ENVASE-RECUPERADO-500-ML.png" },
    { text: 'Blueberry', value: '5' , img: "https://123cuidatuhogar.com/wp-content/uploads/2019/07/LAVALOZA-ENVASE-RECUPERADO-500-ML.png" },
    { text: 'Cherry', value: '6' , img: "https://123cuidatuhogar.com/wp-content/uploads/2019/07/LAVALOZA-ENVASE-RECUPERADO-500-ML.png" },
    { text: 'Cranberry', value: '7' , img: "https://123cuidatuhogar.com/wp-content/uploads/2019/07/LAVALOZA-ENVASE-RECUPERADO-500-ML.png" },
    { text: 'Grape', value: '7' , img: "https://123cuidatuhogar.com/wp-content/uploads/2019/07/LAVALOZA-ENVASE-RECUPERADO-500-ML.png" },
    { text: 'Grapefruit', value: '8' , img: "https://123cuidatuhogar.com/wp-content/uploads/2019/07/LAVALOZA-ENVASE-RECUPERADO-500-ML.png" },
    { text: 'Guava', value: '9' , img: "https://123cuidatuhogar.com/wp-content/uploads/2019/07/LAVALOZA-ENVASE-RECUPERADO-500-ML.png" },
    { text: 'Jackfruit', value: '10' , img: "https://123cuidatuhogar.com/wp-content/uploads/2019/07/LAVALOZA-ENVASE-RECUPERADO-500-ML.png" },
  ];

  constructor(
    private sectionEventService: SectionEventService,
  ) { }

  ngOnInit() {
    if (this.section) {
      this.editMode = this.section.editMode
      this.sectionId = this.section.id
      this.sectionType = this.section.type

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

  segmentChanged(event: CustomEvent) {
    this.selectedSegment = event.detail.value;
  }

  deleteSection() {
    let section: Section = {
      id: this.sectionId,
      type: "hero",
      editMode: true,
      data: this.sectionData
    }
    this.sectionEventService.deleteSection.emit(section);
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
    this.selectedProduct = selectedValue;
    const product = this.products.find((product) => product.value === selectedValue);
    this.selectedProductText = product ? product.text : 'No selection';
    this.modal.dismiss();
  }

}
