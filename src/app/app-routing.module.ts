import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Un componente especifico dedicado a cada ruta
import { HomeComponent } from './routes/home/home.component';
import { ProductsComponent } from './routes/products/products.component';
import { ProductDetailComponent } from './routes/product-detail/product-detail.component';
import { ContactComponent } from './routes/contact/contact.component';
import { DemoComponent } from './routes/demo/demo.component';
import { PageNotFoundComponent } from './routes/page-not-found/page-not-found.component';

// Path: La URI de la ruta
// Component: El componente enlazado dicha ruta
const routes: Routes = [
  {
    path: 'home',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'products/:id',
    component: ProductDetailComponent
  },
  {
    path: 'contacts',
    component: ContactComponent
  },
  {
    path: 'demo',
    component: DemoComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
