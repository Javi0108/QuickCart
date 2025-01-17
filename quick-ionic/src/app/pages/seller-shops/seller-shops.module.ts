import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SellerShopsPageRoutingModule } from './seller-shops-routing.module';

import { SellerShopsPage } from './seller-shops.page';
import { AddWebsiteModalModule } from 'src/app/components/add-website-modal/add-website-modal.module';
import { EditWebsiteModalModule } from 'src/app/components/edit-website-modal/edit-website-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SellerShopsPageRoutingModule,
    AddWebsiteModalModule,
    EditWebsiteModalModule
  ],
  declarations: [SellerShopsPage]
})
export class SellerShopsPageModule {}
