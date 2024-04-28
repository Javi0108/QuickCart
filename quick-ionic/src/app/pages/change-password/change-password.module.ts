import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule, IonInput } from '@ionic/angular';

import { ChangePasswordRoutingModule } from './change-password-routing.module';

import { ChangePassword } from './change-password.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    ChangePasswordRoutingModule
  ],
  declarations: [ChangePassword]
})
export class ChangePasswordModule {}
