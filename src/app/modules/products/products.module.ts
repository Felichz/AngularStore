import { NgModule } from '@angular/core';

import { ProductsRoutingModule } from './products-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { ProductsComponent } from './components/products/products.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';

@NgModule({
    declarations: [
        ProductsComponent,
        ProductDetailComponent
    ],
    imports: [
        ProductsRoutingModule,
        SharedModule
    ],
    exports: [
        ProductsComponent,
        ProductDetailComponent
    ]
})
export class ProductsModule { }
