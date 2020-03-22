import { Injectable } from '@angular/core';
import { ProductInterface } from 'src/app/interfaces/product-interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

// A service is usually used to provide data to the component
export class ProductsService {

  private product: ProductInterface;
  private products: ProductInterface[];

  private API_URL: string = environment.product_api_url;

  constructor( private httpClient: HttpClient ) { }

  getAllProducts(): Observable<ProductInterface[]> {

    return this.httpClient.get<ProductInterface[]>( this.API_URL );
  }

  getProduct( id: string ): Observable<ProductInterface> {

    return this.httpClient.get<ProductInterface>( this.API_URL + id );
  }

  createProduct( product: ProductInterface ) {

    return this.httpClient.post( this.API_URL, product );
  }

  updateProduct( id: string, product: Partial<ProductInterface> ) {

    return this.httpClient.put( this.API_URL + id, product );
  }

  deleteProduct( id: string ) {

    return this.httpClient.delete( this.API_URL + id );
  }

}
