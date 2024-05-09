import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsCatalogPage } from './products-catalog.page';

const routes: Routes = [
  {
    path: '',
    component: ProductsCatalogPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsCatalogPageRoutingModule {}
