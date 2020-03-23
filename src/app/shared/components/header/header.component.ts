import { Component, OnInit } from '@angular/core';

import { CartService } from 'src/app/core/services/cart/cart.service';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private productCount: number;

  constructor(
    private cartService: CartService
  ) {
    this.cartService.cart.subscribe(cartProducts => {
      this.productCount = this.cartService.totalProducts;
    });
  }

  ngOnInit() {
  }

}
