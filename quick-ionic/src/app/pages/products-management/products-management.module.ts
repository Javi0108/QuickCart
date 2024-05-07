import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductsManagementPageRoutingModule } from './products-management-routing.module';

import { ProductsManagementPage } from './products-management.page';
import { AddProductModalModule } from 'src/app/components/add-product-modal/add-product-modal.module';
import { EditProductModalModule } from 'src/app/components/edit-product-modal/edit-product-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ProductsManagementPageRoutingModule,
    AddProductModalModule,
    EditProductModalModule
  ],
  declarations: [ProductsManagementPage]
})
export class ProductsManagementPageModule {}
