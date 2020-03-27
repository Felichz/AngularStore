import { Component, OnInit } from '@angular/core';

import { CartService } from 'src/app/core/services/cart/cart.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';

import { fromEvent } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';

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
  public shopping: boolean;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
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

    this.startFixedCart();
  }

  startFixedCart() {

    this.router.events.subscribe(events => {
      if (events instanceof NavigationEnd) {
        if (events.url === '/products') {
          this.shopping = true;
        } else {
          this.shopping = false;
        }
      }
    });

    this.updateFixedCart();

    fromEvent(window, 'scroll').subscribe(data => {
      this.updateFixedCart();
    });
  }

  updateFixedCart() {
    if (this.shopping) {
      const minScroll = 65;

      this.showFixedCart = window.scrollY > 65;
      this.fixedCartOpacity = (1 / 100) * (window.scrollY - minScroll);
    } else {
      this.showFixedCart = false;
    }
  }

  logout() {
    this.authService.logout();
  }

}
