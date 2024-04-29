import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { SectionHeroComponent } from './section-hero.component';
import { TypeaheadModule } from '../typeahead/typeahead.module';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        IonicModule,
        TypeaheadModule,
        RouterModule
    ],
    declarations: [SectionHeroComponent],
    exports: [SectionHeroComponent]
})
export class SectionHeroModule { }




