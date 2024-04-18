// section-container.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionContainerComponent } from './section-container.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SectionHeroModule } from '../section-hero/section-hero.module';

@NgModule({
  declarations: [SectionContainerComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SectionHeroModule,
  ],
  exports: [SectionContainerComponent],
})
export class SectionContainerModule {}
