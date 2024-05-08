// section-container.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionContainerComponent } from './section-container.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SectionHeroModule } from '../section-hero/section-hero.module';
import { SectionBannersModule } from '../section-banners/section-banners.module';
import { SectionProductsModule } from '../section-products/section-products.module';
import { SectionAboutOfModule } from '../section-about-of/section-about-of.module';

@NgModule({
  declarations: [SectionContainerComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SectionHeroModule,
    SectionBannersModule,
    SectionProductsModule,
    SectionAboutOfModule
  ],
  exports: [SectionContainerComponent],
})
export class SectionContainerModule {}
