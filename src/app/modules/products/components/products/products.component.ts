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

  public rows: {start: number, end: number}[];;
  public PRODUCTS_PER_ROW: number;

  constructor(private productsService: ProductsService) {
    this.title = 'Angular Store';
    this.products = productsService.getAllProducts();

    this.PRODUCTS_PER_ROW = 3;

    this.rows = [];
    for (let i = 0; i < this.products.length / this.PRODUCTS_PER_ROW; i++) {
      this.rows.push({
        start: (i) * 3,
        end: ( (i + 1) * 3) - 1
      });
    }
  }

  addToCart(id: string) {
    console.log(`AppComponent: Product ${id} added to cart`);
  }

  ngOnInit() {}
}
