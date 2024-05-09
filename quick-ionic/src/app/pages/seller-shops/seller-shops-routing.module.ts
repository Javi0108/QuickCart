import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SellerShopsPage } from './seller-shops.page';

const routes: Routes = [
  {
    path: '',
    component: SellerShopsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SellerShopsPageRoutingModule {}
