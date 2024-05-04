import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { SectionHeroComponent } from './section-hero.component';
import { TypeaheadModule } from '../typeahead/typeahead.module';
import { RouterModule } from '@angular/router';
import { EditSectionModalModule } from '../edit-section-modal/edit-section-modal.module';

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




