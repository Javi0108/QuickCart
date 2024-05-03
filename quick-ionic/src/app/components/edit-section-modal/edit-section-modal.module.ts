import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditSectionModalComponent } from './edit-section-modal.component';

@NgModule({
  declarations: [EditSectionModalComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [EditSectionModalComponent] 
})
export class EditSectionModalModule {}
