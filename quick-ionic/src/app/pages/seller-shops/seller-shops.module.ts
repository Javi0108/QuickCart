import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SellerShopsPageRoutingModule } from './seller-shops-routing.module';

import { SellerShopsPage } from './seller-shops.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SellerShopsPageRoutingModule
  ],
  declarations: [SellerShopsPage]
})
export class SellerShopsPageModule {}
