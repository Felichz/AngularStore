import { Component, OnInit } from '@angular/core';
import { ProductInterface } from 'src/app/interfaces/product-interface';
import { ProductsService } from 'src/app/core/services/products/products.service';

import Swal from 'sweetalert2';

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

    const executeDelete = () => {
      this.productsService.deleteProduct( id ).subscribe();

      this.products = this.products.filter( product => {
        return product.id !== id;
      });
    };

    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        executeDelete();

        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );
      }
    });

  }

}
