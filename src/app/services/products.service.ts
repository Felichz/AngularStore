import { Injectable } from '@angular/core';
import { ProductInterface } from '../interfaces/product-interface';

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
        title: 'Camiseta',
        price: 80000,
        description: 'bla bla bla bla bla',
        destroyed: false
      },
      {
        id: '2',
        image: 'assets/images/hoodie.png',
        title: 'Hoodie',
        price: 80000,
        description: 'bla bla bla bla bla',
        destroyed: false
      },
      {
        id: '3',
        image: 'assets/images/mug.png',
        title: 'Mug',
        price: 80000,
        description: 'bla bla bla bla bla',
        destroyed: false
      },
      {
        id: '4',
        image: 'assets/images/pin.png',
        title: 'Pin',
        price: 80000,
        description: 'bla bla bla bla bla',
        destroyed: false
      },
      {
        id: '5',
        image: 'assets/images/stickers1.png',
        title: 'Stickers',
        price: 80000,
        description: 'bla bla bla bla bla',
        destroyed: false
      },
      {
        id: '6',
        image: 'assets/images/stickers2.png',
        title: 'Stickers',
        price: 80000,
        description: 'bla bla bla bla bla',
        destroyed: false
      },
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
