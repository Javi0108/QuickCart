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
  sectionForm!: FormGroup;

  constructor(private sectionEventService: SectionEventService) { }

  ngOnInit() {

    if (this.section) {
      console.log("hola")
      this.sectionId = this.section.id
      this.sectionType = this.section.type
      if(this.section.data.defaultSectionHeroData){
        this.sectionData = this.section.data.defaultSectionHeroData
      }else{
        this.sectionData = this.section.data
      }
    } 

    this.sectionForm = new FormGroup({
      subtitle: new FormControl(this.sectionData?.banner_1.subtitle),
      title: new FormControl(this.sectionData?.banner_1.title),
      content: new FormControl(this.sectionData?.banner_1.content),
      price_text: new FormControl(this.sectionData?.banner_1.price_text),
      price: new FormControl(this.sectionData?.banner_1.price),
      button: new FormControl(this.sectionData?.banner_1.button)
    })

    this.sectionForm.valueChanges.subscribe((values) => {
      this.sectionData!.banner_1 = { ...this.sectionData!.banner_1, ...values };
    });
  }

  updateChanges() {
    let section: Section = {
      id: this.sectionId,
      type: "hero",
      data: this.sectionData
    }

    this.sectionEventService.sectionEdited.emit(section);
  }

  saveChanges() {
    this.editingMode = false;

    let section: Section = {
      id: this.sectionId,
      type: "hero",
      data: this.sectionData
    }
    this.sectionEventService.changeSaved.emit(section);
  }

}
