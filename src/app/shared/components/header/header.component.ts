import { Component, OnInit } from '@angular/core';

import { CartService } from 'src/app/core/services/cart/cart.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';

import { Observable, fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public logged: boolean;
  public productCount: number;
  public showFixedCart: boolean;
  public fixedCartOpacity: number;

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

    const minScroll = 65;

    this.showFixedCart = window.scrollY > minScroll;
    this.fixedCartOpacity = (1 / 100) * (window.scrollY - minScroll);

    fromEvent(window, 'scroll').subscribe(data => {

      this.showFixedCart = window.scrollY > 65;
      this.fixedCartOpacity = (1 / 100) * (window.scrollY - minScroll);
    });
  }

  logout() {
    this.authService.logout();
  }

}
