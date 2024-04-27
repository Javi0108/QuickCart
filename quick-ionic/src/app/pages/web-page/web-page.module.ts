import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WebPagePageRoutingModule } from './web-page-routing.module';

import { WebPagePage } from './web-page.page';
import { SectionContainerModule } from 'src/app/components/section-container/section-container.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WebPagePageRoutingModule,
    SectionContainerModule
  ],
  declarations: [WebPagePage]
})
export class WebPagePageModule {}
