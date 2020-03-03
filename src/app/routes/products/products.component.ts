import { Component, OnInit } from '@angular/core';
import { ProductInterface } from '../../interfaces/product-interface';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  public products: ProductInterface[];
  public title: string;

  constructor( private productsService: ProductsService ) {

    this.title = 'Angular Store';
    this.products = productsService.getAllProducts();
  }

  addToCart( id: string ) {
    console.log(`AppComponent: Product ${id} added to cart`);
  }

  destroyProduct( id: string ) {
    this.productsService.deleteProduct(id);
  }

  ngOnInit() {
  }

}
