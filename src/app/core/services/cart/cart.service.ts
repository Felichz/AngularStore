import { Injectable } from '@angular/core';

import { ProductInterface } from 'src/app/interfaces/product-interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartProductInterface } from 'src/app/interfaces/cart-product-interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private products: CartProductInterface[] = [];
  private cartSubject: BehaviorSubject<CartProductInterface[]>;
  public cart: Observable<CartProductInterface[]>;
  public totalProducts = 0;
  public totalPrice = 0;

  constructor() {
    this.cartSubject = new BehaviorSubject<CartProductInterface[]>([]);
    this.cart = this.cartSubject.asObservable();
  }

  addProduct( newProduct: ProductInterface ) {
    const product: CartProductInterface = this.products.find( item => item.id === newProduct.id );

    if ( product ) {
      product.quantity++;
    } else {
      const tempProduct: Partial<CartProductInterface> = newProduct;
      tempProduct.quantity = 1;
      this.products = [...this.products, tempProduct as CartProductInterface];
    }
    this.totalPrice += newProduct.price;
    this.totalProducts++;

    this.cartSubject.next(this.products);
  }

  removeProduct( id: string ) {
    const product: CartProductInterface = this.products.find( item => item.id === id );

    if (product) {
      if ( product.quantity > 1 ) {
        product.quantity--;
      } else {
        this.products = this.products.filter( item => item.id !== id);
      }

      this.totalPrice -= product.price;
      this.totalProducts--;

      this.cartSubject.next(this.products);
    }
  }

}
