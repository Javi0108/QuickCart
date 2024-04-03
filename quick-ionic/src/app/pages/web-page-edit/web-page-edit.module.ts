import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WebPageEditPageRoutingModule } from './web-page-edit-routing.module';

import { WebPageEditPage } from './web-page-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WebPageEditPageRoutingModule
  ],
  declarations: [WebPageEditPage]
})
export class WebPageEditPageModule {}
