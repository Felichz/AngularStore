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

    return this.httpClient.get<ProductInterface[]>(this.API_URL);
  }

  getProduct( id: string ): Observable<ProductInterface> {

    return this.httpClient.get<ProductInterface>(`${this.API_URL}${id}`);
  }

}
