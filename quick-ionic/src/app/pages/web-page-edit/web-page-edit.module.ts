import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WebPageEditPageRoutingModule } from './web-page-edit-routing.module';

import { WebPageEditPage } from './web-page-edit.page';
import { SectionContainerModule } from 'src/app/components/section-container/section-container.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WebPageEditPageRoutingModule,
    SectionContainerModule
  ],
  declarations: [WebPageEditPage]
})
export class WebPageEditPageModule {}
