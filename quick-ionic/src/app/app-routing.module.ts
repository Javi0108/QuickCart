import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'seller-shops',
    loadChildren: () => import('./pages/seller-shops/seller-shops.module').then( m => m.SellerShopsPageModule)
  },
  {
    path: 'web-page/:name/:id',
    loadChildren: () => import('./pages/web-page/web-page.module').then( m => m.WebPagePageModule)
  },
  {
    path: 'web-page-edit/:id',
    loadChildren: () => import('./pages/web-page-edit/web-page-edit.module').then( m => m.WebPageEditPageModule)
  },
  {
    path: 'catalog',
    loadChildren: () => import('./pages/products-catalog/products-catalog.module').then( m => m.ProductsCatalogPageModule)
  },
  {
    path: 'product/:id',
    loadChildren: () => import('./pages/product-detail/product-detail.module').then( m => m.ProductDetailPageModule)
  },
  {
    path: 'change-password',
    loadChildren: () => import('./pages/change-password/change-password.module').then( m => m.ChangePasswordModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
