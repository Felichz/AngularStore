import { NgModule } from '@angular/core';

import { AuthService } from './services/auth/auth.service';
import { CartService } from './services/cart/cart.service';
import { ProductsService } from './services/products/products.service';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
    declarations: [],
    imports: [],
    providers: [AuthService, CartService, ProductsService, CookieService],
})
export class CoreModule {}
