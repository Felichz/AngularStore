import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { identifierModuleUrl } from '@angular/compiler';

import { ProductsService } from '../../services/products.service';
import { ProductInterface } from 'src/app/interfaces/product-interface';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})

export class ProductDetailComponent implements OnInit {
  public product: ProductInterface;
  public productString: string;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) { }

  ngOnInit() {
    this.route.params.subscribe( (params: Params) => {
      const id = params.id;
      this.product = this.productsService.getProduct( id );
      this.productString = JSON.stringify( this.product );
    } );
  }

}