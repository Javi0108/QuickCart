// typeahead.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular'; // Importa IonicModule desde Ionic

import { TypeaheadComponent } from './typeahead.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [TypeaheadComponent],
  imports: [
    CommonModule, 
    IonicModule, 
    FormsModule
  ],
  exports: [TypeaheadComponent]
})
export class TypeaheadModule { }
