import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuccesPage } from './success.page';

const routes: Routes = [
  {
    path: '',
    component: SuccesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuccessPageRoutingModule {}
