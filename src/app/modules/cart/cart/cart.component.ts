import { Component, OnInit } from '@angular/core';
import { ProductInterface } from 'src/app/interfaces/product-interface';
import { CartService } from 'src/app/core/services/cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public products: ProductInterface[];
  public title: string;

  constructor( private cartService: CartService ) {
    this.title = 'Angular Store';
  }

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.cartService.cart
      .subscribe( products => {
        this.products = products;
      });
  }
}
