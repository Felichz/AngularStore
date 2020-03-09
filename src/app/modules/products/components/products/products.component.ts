import { Component, OnInit } from '@angular/core';

import { ProductInterface } from 'src/app/interfaces/product-interface';
import { ProductsService } from 'src/app/core/services/products/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  public products: ProductInterface[];
  public title: string;

  public rows: {start: number, end: number}[];
  public PRODUCTS_PER_ROW: number;

  constructor( private productsService: ProductsService ) {
    this.title = 'Angular Store';
  }

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.productsService.getAllProducts()
      .subscribe( products => {
        this.products = products;
      });
  }

  addToCart(id: string) {
    console.log(`AppComponent: Product ${id} added to cart`);
  }
}
