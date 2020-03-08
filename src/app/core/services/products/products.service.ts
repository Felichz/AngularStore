import { Injectable } from '@angular/core';
import { ProductInterface } from 'src/app/interfaces/product-interface';

@Injectable({
  providedIn: 'root'
})

// A service is usually used to provide data to the component
export class ProductsService {

  private products: ProductInterface[];

  constructor() {
    this.products = [
      {
        id: '1',
        image: 'assets/images/camiseta.png',
        title: 'T-Shirt',
        price: 80000,
        description: 'bla bla bla bla bla'
      },
      {
        id: '2',
        image: 'assets/images/hoodie.png',
        title: 'Hoodie',
        price: 80000,
        description: 'bla bla bla bla bla'
      },
      {
        id: '3',
        image: 'assets/images/mug.png',
        title: 'Mug',
        price: 80000,
        description: 'bla bla bla bla bla'
      },
      {
        id: '4',
        image: 'assets/images/pin.png',
        title: 'Pin',
        price: 80000,
        description: 'bla bla bla bla bla'
      },
      {
        id: '5',
        image: 'assets/images/stickers1.png',
        title: 'Stickers',
        price: 80000,
        description: 'bla bla bla bla bla'
      },
      {
        id: '6',
        image: 'assets/images/stickers2.png',
        title: 'Stickers',
        price: 80000,
        description: 'bla bla bla bla bla'
      }
    ];
  }

  getAllProducts(): ProductInterface[] {
    return this.products;
  }

  getProduct( id: string ): ProductInterface {
    return this.products.find( product => product.id === id );
  }

  deleteProduct( id: string ) {
    const product: ProductInterface = this.getProduct(id);

    product.destroyed = true;
  }

}
