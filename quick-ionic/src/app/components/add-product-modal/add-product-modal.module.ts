import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddProductModalComponent } from './add-product-modal.component';

@NgModule({
  declarations: [AddProductModalComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [AddProductModalComponent]
})
export class AddProductModalModule {}
