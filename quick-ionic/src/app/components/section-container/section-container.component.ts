import { Component, Injector, Input, OnInit } from '@angular/core';
import { SectionHeroComponent } from '../section-hero/section-hero.component';
import { SectionProductsComponent } from '../section-products/section-products.component';
import { Section } from 'src/app/interfaces/section.interface';

@Component({
  selector: 'app-section-container',
  template: `
    <div *ngFor="let section of sections">
      <ng-container *ngComponentOutlet="sectionComponents[section.type]; injector: injector"></ng-container>
    </div>
  `,
})
export class SectionContainerComponent implements OnInit {
  @Input() sections: Section[] = [];

  sectionComponents: { [key: string]: any } = {
    'hero': SectionHeroComponent,
    'products': SectionProductsComponent,
  };

  injector: any;

  constructor() {
    this.injector = Injector.create({providers: [], parent: this.injector});
  }
  
  ngOnInit() {
  }
}
