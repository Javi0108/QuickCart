import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WebPageEditPage } from './web-page-edit.page';

const routes: Routes = [
  {
    path: '',
    component: WebPageEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebPageEditPageRoutingModule {}
