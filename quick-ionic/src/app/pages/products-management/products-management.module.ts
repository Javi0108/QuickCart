import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductsManagementPageRoutingModule } from './products-management-routing.module';

import { ProductsManagementPage } from './products-management.page';
import { AddProductModalModule } from 'src/app/components/add-product-modal/add-product-modal.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    ProductsManagementPageRoutingModule,
    AddProductModalModule,
  ],
  declarations: [ProductsManagementPage]
})
export class ProductsManagementPageModule {}
