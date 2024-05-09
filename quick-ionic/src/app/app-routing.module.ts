import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    data: { menu: 'default' }
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule),
    data: { menu: 'default' }
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    data: { menu: 'default' }
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule),
    data: { menu: 'default' }
  },
  {
    path: 'seller-shops',
    loadChildren: () => import('./pages/seller-shops/seller-shops.module').then( m => m.SellerShopsPageModule),
    data: { menu: 'default' }
  },
  {
    path: 'web-page/:name/:id',
    loadChildren: () => import('./pages/web-page/web-page.module').then( m => m.WebPagePageModule),
    data: { menu: 'default' }
  },
  {
    path: 'web-page-edit/:id',
    loadChildren: () => import('./pages/web-page-edit/web-page-edit.module').then( m => m.WebPageEditPageModule),
    data: { menu: 'edit' }
  },
  {
    path: 'shop-catalog/:id',
    loadChildren: () => import('./pages/shop-catalog/shop-catalog.module').then( m => m.ShopCatalogPageModule),
    data: { menu: 'default' }
  },
  {
    path: 'catalog',
    loadChildren: () => import('./pages/products-catalog/products-catalog.module').then( m => m.ProductsCatalogPageModule),
    data: { menu: 'default' }
  },
  {
    path: 'products-management/:id',
    loadChildren: () => import('./pages/products-management/products-management.module').then( m => m.ProductsManagementPageModule),
    data: { menu: 'default' }
  },
  {
    path: 'product/:id',
    loadChildren: () => import('./pages/product-detail/product-detail.module').then( m => m.ProductDetailPageModule),
    data: { menu: 'default' }
  },
  {
    path: 'change-password',
    loadChildren: () => import('./pages/change-password/change-password.module').then( m => m.ChangePasswordModule)
  },
  {
    path: 'web-page-catalog/:sellerId',
    loadChildren: () => import('./pages/web-page-catalog/web-page-catalog.module').then( m => m.WebPageCatalogPageModule)
  },
  {
    path: 'web-page-catalog',
    loadChildren: () => import('./pages/web-page-catalog/web-page-catalog.module').then( m => m.WebPageCatalogPageModule)
  },
  {
    path: 'not-found',
    loadChildren: () => import('./pages/not-found/not-found.module').then( m => m.NotFoundPageModule),
    data: { menu: 'edit' }
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'not-found',
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
