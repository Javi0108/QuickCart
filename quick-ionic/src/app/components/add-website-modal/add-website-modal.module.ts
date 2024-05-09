import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddWebsiteModalComponent } from './add-website-modal.component';

@NgModule({
  declarations: [AddWebsiteModalComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [AddWebsiteModalComponent] // Si deseas exportar el componente
})
export class AddWebsiteModalModule {}
