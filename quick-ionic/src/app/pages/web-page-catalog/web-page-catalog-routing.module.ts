import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WebPageCatalogPage } from './web-page-catalog.page';

const routes: Routes = [
  {
    path: '',
    component: WebPageCatalogPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebPageCatalogPageRoutingModule {}
