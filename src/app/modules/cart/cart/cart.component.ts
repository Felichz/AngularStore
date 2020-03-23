import { Component, OnInit } from '@angular/core';
import { ProductInterface } from 'src/app/interfaces/product-interface';
import { CartProductInterface } from 'src/app/interfaces/cart-product-interface';
import { CartService } from 'src/app/core/services/cart/cart.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public cartObserver: Observable<CartProductInterface[]>;
  public title: string;

  constructor( private cartService: CartService ) {
    this.title = 'Angular Store';
  }

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.cartObserver = this.cartService.cart;
  }

  removeProduct( id: string ) {
    this.cartService.removeProduct(id);
  }
}
