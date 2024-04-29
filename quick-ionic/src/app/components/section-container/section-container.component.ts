import { Component, Input, OnInit } from '@angular/core';
import { SectionHeroComponent } from '../section-hero/section-hero.component';
import { SectionProductsComponent } from '../section-products/section-products.component';
import { Section } from 'src/app/interfaces/section.interface';
import { SectionBannersComponent } from '../section-banners/section-banners.component';

@Component({
  selector: 'app-section-container',
  templateUrl: './section-container.component.html',
  styleUrls: ['./section-container.component.scss'],
})
export class SectionContainerComponent implements OnInit {
  @Input() sections: Section[] = [];

  sectionComponents: { [key: string]: any } = {
    'hero': SectionHeroComponent,
    'banners': SectionBannersComponent,
    'products': SectionProductsComponent,
  };

  constructor() { }

  ngOnInit() { 
  }

}
