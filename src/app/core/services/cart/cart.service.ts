import { Injectable } from '@angular/core';

import { ProductInterface } from 'src/app/interfaces/product-interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private products: ProductInterface[] = [];
  private cartSubject: BehaviorSubject<ProductInterface[]>;
  public cart: Observable<ProductInterface[]>;

  constructor() {
    this.cartSubject = new BehaviorSubject<ProductInterface[]>([]);
    this.cart = this.cartSubject.asObservable();
  }

  addProduct( product: ProductInterface ) {
    this.products = [...this.products, product];
    this.cartSubject.next(this.products);
  }

}
