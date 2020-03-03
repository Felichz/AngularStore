import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './components/product/product.component';
import { ProductsComponent } from './routes/products/products.component';
import { PowPipe } from './pipes/pow.pipe';
import { SqrtPipe } from './pipes/sqrt.pipe';
import { HighlightDirective } from './directives/highlight.directive';
import { PageNotFoundComponent } from './routes/page-not-found/page-not-found.component';
import { HomeComponent } from './routes/home/home.component';
import { ContactComponent } from './routes/contact/contact.component';
import { DemoComponent } from './routes/demo/demo.component';
import { HeaderComponent } from './components/header/header.component';
import { BannerComponent } from './components/banner/banner.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductDetailComponent } from './routes/product-detail/product-detail.component';
import { LayoutComponent } from './components/layout/layout.component';


@NgModule({
  // Componentes, Pipes, Directivas
  declarations: [
    AppComponent,
    ProductComponent,
    PowPipe,
    SqrtPipe,
    HighlightDirective,
    HomeComponent,
    ProductsComponent,
    ContactComponent,
    DemoComponent,
    HeaderComponent,
    BannerComponent,
    FooterComponent,
    PageNotFoundComponent,
    ProductDetailComponent,
    LayoutComponent
  ],
  // Modulos
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
