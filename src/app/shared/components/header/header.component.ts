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

  private productCount: Observable<number>;

  constructor(
    private cartService: CartService
  ) {
    this.productCount = this.cartService.cart.pipe(
      map( products => products.length )
    );
  }

  ngOnInit() {
  }

}
