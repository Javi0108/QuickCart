import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WebPagePageRoutingModule } from './web-page-routing.module';

import { WebPagePage } from './web-page.page';
import { SectionContainerModule } from 'src/app/components/section-container/section-container.module';
import { ShopCatalogPageModule } from '../shop-catalog/shop-catalog.module';
import { ProfilePageModule } from '../profile/profile.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WebPagePageRoutingModule,
    SectionContainerModule,
    ShopCatalogPageModule,
    ProfilePageModule,
  ],
  declarations: [WebPagePage],
  exports:[WebPagePage]
})
export class WebPagePageModule {}
