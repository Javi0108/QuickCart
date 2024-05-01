import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WebPageEditPageRoutingModule } from './web-page-edit-routing.module';

import { WebPageEditPage } from './web-page-edit.page';
import { SectionContainerModule } from 'src/app/components/section-container/section-container.module';
import { WebPagePageModule } from '../web-page/web-page.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WebPageEditPageRoutingModule,
    SectionContainerModule,
    WebPagePageModule
  ],
  declarations: [WebPageEditPage]
})
export class WebPageEditPageModule {}
