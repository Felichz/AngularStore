import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductInterface } from 'src/app/interfaces/product-interface';
import { CartProductInterface } from 'src/app/interfaces/cart-product-interface';
import { CartService } from 'src/app/core/services/cart/cart.service';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  public title: string;

  private cartSubscription: Subscription;
  private cartProducts: CartProductInterface[];
  private totalPrice = 0;

  constructor( private cartService: CartService ) {
    this.title = 'Angular Store';
  }

  ngOnInit() {
    this.fetchProducts();
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
  }

  fetchProducts() {
    this.cartSubscription = this.cartService.cart.subscribe(cartProducts => {
      this.cartProducts = cartProducts;
      this.totalPrice = this.cartService.totalPrice;
    });
  }

  removeProduct( id: string ) {
    this.cartService.removeProduct(id);
  }
}
