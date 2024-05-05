import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditWebsiteModalComponent } from './edit-website-modal.component';

@NgModule({
  declarations: [EditWebsiteModalComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [EditWebsiteModalComponent] // Si deseas exportar el componente
})
export class EditWebsiteModalModule {}
