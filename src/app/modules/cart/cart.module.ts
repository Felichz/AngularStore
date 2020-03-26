import { NgModule } from '@angular/core';

import { CartRoutingModule } from './cart-routing.module';

import { CartComponent } from './cart/cart.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CartRoutingModule,
    SharedModule
  ],
  exports: [
    CartComponent
  ]
})
export class CartModule { }
