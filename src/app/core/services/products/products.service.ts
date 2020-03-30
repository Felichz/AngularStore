import { Injectable } from '@angular/core';
import { ProductInterface } from 'src/app/interfaces/product-interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import 'firebase/firestore';

import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

// A service is usually used to provide data to the component
export class ProductsService {

  private product: ProductInterface;
  private products: ProductInterface[];

  private API_URL: string = environment.product_api_url;

  private productsCollection: AngularFirestoreCollection<ProductInterface>;
  private productDoc: AngularFirestoreDocument<ProductInterface>;

  constructor(
    private httpClient: HttpClient,
    private afs: AngularFirestore
  ) {
    this.productsCollection = this.afs.collection('products');
  }

  getAllProducts(): Observable<ProductInterface[]> {

    // return this.httpClient.get<ProductInterface[]>( this.API_URL );

    return this.productsCollection.snapshotChanges().pipe(
      map(snaps => {
        return snaps.map(snap => {
          const productId = snap.payload.doc.id;
          const productData = snap.payload.doc.data();
          return {id: productId, ...productData};
        });
      })
    );
  }

  getProduct( id: string ): Observable<ProductInterface> {

    // return this.httpClient.get<ProductInterface>( this.API_URL + id );

    return this.afs.doc(`products/${id}`).valueChanges().pipe(
      map((product: ProductInterface) => {
        return {id, ...product};
      })
    );
  }

  createProduct( product: ProductInterface ): Promise<void> {

    // return this.httpClient.post( this.API_URL, product );
    const newId = this.afs.createId();
    const newProductDoc = this.afs.doc<ProductInterface>('products/' + newId);
    return newProductDoc.set(product);
  }

  updateProduct( id: string, product: Partial<ProductInterface> ): Promise<void> {

    // return this.httpClient.put( this.API_URL + id, product );
    return this.afs.doc(`products/${id}`).update(product);
  }

  deleteProduct( id: string ): Promise<void> {

    // return this.httpClient.delete( this.API_URL + id );
    return this.afs.doc(`products/${id}`).delete();
  }

}
