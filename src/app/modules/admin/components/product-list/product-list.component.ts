import { Component, OnInit } from '@angular/core';
import { ProductInterface } from 'src/app/interfaces/product-interface';
import { ProductsService } from 'src/app/core/services/products/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'title', 'price', 'description', 'actions'];
  products: ProductInterface[];

  constructor( private productsService: ProductsService ) { }

  ngOnInit() {
      this.fetchProducts();
  }

  fetchProducts() {

    this.productsService.getAllProducts()
      .subscribe( products => {
        this.products = products;
      });
  }

  deleteProduct( id: string ) {

    this.productsService.deleteProduct( id ).subscribe();

    this.products = this.products.filter( product => {
      return product.id !== id;
    });
  }

}
