import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShopCatalogPage } from './shop-catalog.page';

const routes: Routes = [
  {
    path: '',
    component: ShopCatalogPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopCatalogPageRoutingModule {}
