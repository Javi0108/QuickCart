import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { SectionHeroComponent } from './section-hero.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
    ],
    declarations: [SectionHeroComponent],
    exports: [SectionHeroComponent]
})
export class SectionHeroModule { }




