// section-container.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionContainerComponent } from './section-container.component';

@NgModule({
  declarations: [SectionContainerComponent],
  imports: [CommonModule],
  exports: [SectionContainerComponent],
})
export class SectionContainerModule {}
