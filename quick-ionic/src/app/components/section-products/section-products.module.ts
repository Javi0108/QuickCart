import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TypeaheadModule } from '../typeahead/typeahead.module';
import { RouterModule } from '@angular/router';
import { SectionProductsComponent } from './section-products.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        IonicModule,
        TypeaheadModule,
        RouterModule
    ],
    declarations: [SectionProductsComponent],
    exports: [SectionProductsComponent]
})
export class SectionProductsModule { }