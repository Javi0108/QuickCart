import { SectionEventService } from 'src/app/services/section-event.service';
import { HeroSectionData, Section } from './../../interfaces/section.interface';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-section-hero',
  templateUrl: './section-hero.component.html',
  styleUrls: ['./section-hero.component.scss'],
})
export class SectionHeroComponent implements OnInit {

  @Input() section: any;

  sectionId?: number;
  sectionType?: string;
  sectionData?: HeroSectionData;
  editingMode = false;

  sectionFormBannerOne!: FormGroup;
  sectionFormBannerTwo!: FormGroup;
  sectionFormBannerThree!: FormGroup;

  selectedSegment: string = 'banner_1';

  constructor(private sectionEventService: SectionEventService) { }

  ngOnInit() {

    if (this.section) {
      this.sectionId = this.section.id
      this.sectionType = this.section.type
      if(this.section.data.defaultSectionHeroData){
        this.sectionData = this.section.data.defaultSectionHeroData
      }else{
        this.sectionData = this.section.data
      }
    }

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

    this.sectionEventService.shopDataChanged.subscribe((shopData: any) => {
      this.handleShopDataChanged(shopData);
    });
  }

  handleShopDataChanged(shopData: any){
    this.sectionId = shopData.id
    console.log(shopData)
  }

  segmentChanged(event: CustomEvent) {
    this.selectedSegment = event.detail.value;
  }

  deleteSection() {
    let section: Section = {
      id: this.sectionId,
      type: "hero",
      data: this.sectionData
    }
    this.sectionEventService.deleteSection.emit(section);
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.sectionFormBannerThree.patchValue({
        image: file
      });
    }
  }

}
