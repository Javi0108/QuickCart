import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShopCatalogPageRoutingModule } from './shop-catalog-routing.module';

import { ShopCatalogPage } from './shop-catalog.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShopCatalogPageRoutingModule
  ],
  declarations: [ShopCatalogPage],
  exports: [ShopCatalogPage] // Asegúrate de exportar ShopCatalogComponent
})
export class ShopCatalogPageModule {}
