import { Component, OnInit } from '@angular/core';

import { CartService } from 'src/app/core/services/cart/cart.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private productCount: number;
  private logged: boolean;

  constructor(
    private cartService: CartService,
    private authService: AuthService
  ) {
    const log = this.authService.getLoggedUser()
      .subscribe(user => {
        this.logged = user ? true : false;
      });
  }

  ngOnInit() {
    this.cartService.cart.subscribe(cartProducts => {
      this.productCount = this.cartService.totalProducts;
    });
  }

  logout() {
    this.authService.logout();
  }

}
