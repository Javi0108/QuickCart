import { SectionEventService } from 'src/app/services/section-event.service';
import { HeroSectionData, Section } from './../../interfaces/section.interface';
import { Component, OnInit, Injector, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-section-hero',
  templateUrl: './section-hero.component.html',
  styleUrls: ['./section-hero.component.scss'],
})
export class SectionHeroComponent implements OnInit {

  sectionData!: HeroSectionData;
  editingMode = false;
  constructor(private sectionEventService: SectionEventService) { }

  ngOnInit() {

    this.sectionEventService.changeSaved.subscribe((section: any) => {});

    this.sectionData = {
      banner_1:
      {
        subtitle: "Big Sale Offer3",
        title: "Get The Best Deal on CCTV Camera",
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, perspiciatis sapiente exercitationem delectus quisquam incidunt voluptatibus ex accusamus, molestiae neque aspernatur. Ut laborum praesentium et unde, magni rem aut dolore!",
        price_text: "Combo Only:",
        price: "590$",
        button: "Shop Now",
        images: "http://localhost:8000/media/sections/default/hero_section/slider-bg1.jpg"
        //id de product?? o enlace
      },
      banner_2: {
        subtitle: "New line required",
        title: "iphone 13 pro max",
        price: "590$",
        images: "http://localhost:8000/media/sections/default/hero_section/slider-bnr.jpg"
        //enlace
      },
      banner_3: {
        title: "Weekly Sale!",
        content: "Saving up to 50% off all online store items this week.",
        button: "Shop Now",
        images: "http://localhost:8000/media/sections/default/hero_section/slider-bg2.jpg"
        //enlace
      }
    }
  }

  saveChanges() {
    this.editingMode = false;
    this.sectionEventService.changeSaved.emit(this.sectionData); // Emite el evento utilizando el servicio
    console.log("saveChanges")
  }

}
