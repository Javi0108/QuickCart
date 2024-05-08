import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WebPageCatalogPageRoutingModule } from './web-page-catalog-routing.module';

import { WebPageCatalogPage } from './web-page-catalog.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WebPageCatalogPageRoutingModule
  ],
  declarations: [WebPageCatalogPage]
})
export class WebPageCatalogPageModule {}
