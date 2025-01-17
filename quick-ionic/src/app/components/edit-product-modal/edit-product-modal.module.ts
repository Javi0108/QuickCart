import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditProductModalComponent } from './edit-product-modal.component';

@NgModule({
  declarations: [EditProductModalComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [EditProductModalComponent]
})
export class EditProductModalModule {}
