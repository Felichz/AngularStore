import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';

import { AdminGuard } from '../guards/admin.guard';

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
        path: 'demo',
        loadChildren: () => import('src/app/modules/demo/demo.module').then( m => m.DemoModule )
      },
      {
        path: 'login',
        loadChildren: () => import('src/app/modules/login/login.module').then( m => m.LoginModule )
      },
      {
        path: 'register',
        loadChildren: () => import('src/app/modules/register/register.module').then( m => m.RegisterModule )
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class LayoutRoutingModule { }
