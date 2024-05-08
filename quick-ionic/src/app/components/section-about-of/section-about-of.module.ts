import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TypeaheadModule } from '../typeahead/typeahead.module';
import { RouterModule } from '@angular/router';
import { SectionAboutOfComponent } from './section-about-of.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        IonicModule,
        TypeaheadModule,
        RouterModule
    ],
    declarations: [SectionAboutOfComponent],
    exports: [SectionAboutOfComponent]
})
export class SectionAboutOfModule { }