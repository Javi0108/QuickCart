import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { IonicModule } from '@ionic/angular';

import { WebPageEditPageRoutingModule } from './web-page-edit-routing.module';

import { WebPageEditPage } from './web-page-edit.page';
import { BrowserModule } from '@angular/platform-browser';
import { SectionContainerModule } from 'src/app/components/section-container/section-container.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WebPageEditPageRoutingModule,
    DragDropModule,
    SectionContainerModule
  ],
  declarations: [WebPageEditPage]
})
export class WebPageEditPageModule {}
