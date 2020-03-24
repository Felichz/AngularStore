import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';

import { AngularFireAuthGuard, redirectLoggedInTo } from '@angular/fire/auth-guard';

const redirectLoggedInToAdmin = () => redirectLoggedInTo(['/home']);

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: () => import('src/app/modules/home/home.module').then( m => m.HomeModule )
      },
      {
        path: 'products',
        loadChildren: () => import('src/app/modules/products/products.module').then( m => m.ProductsModule )
      },
      {
        path: 'contacts',
        loadChildren: () => import('src/app/modules/contact/contact.module').then( m => m.ContactModule )
      },
      {
        path: 'login',
        loadChildren: () => import('src/app/modules/login/login.module').then( m => m.LoginModule ),
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectLoggedInToAdmin }
      },
      {
        path: 'register',
        loadChildren: () => import('src/app/modules/register/register.module').then( m => m.RegisterModule ),
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectLoggedInToAdmin }
      },
      {
        path: 'cart',
        loadChildren: () => import('src/app/modules/cart/cart.module').then( m => m.CartModule )
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class LayoutRoutingModule { }
