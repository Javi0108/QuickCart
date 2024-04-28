import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductsCatalogPageRoutingModule } from './products-catalog-routing.module';
import { ProductsCatalogPage } from './products-catalog.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductsCatalogPageRoutingModule
  ],
  declarations: [ProductsCatalogPage]
})
export class ProductsCatalogPageModule {}
