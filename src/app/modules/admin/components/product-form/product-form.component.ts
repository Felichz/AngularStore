import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ProductsService } from 'src/app/core/services/products/products.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  productForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private productService: ProductsService
  ) {
    this.productForm = this.formBuilder.group({
      id: ['', [ Validators.required ]],
      image: ['', [ Validators.required ]],
      title: ['', [ Validators.required ]],
      price: ['', [ Validators.required ]],
      description: ['', [ Validators.required ]]
    });
  }

  ngOnInit() {
  }

  submitForm(product, event) {

    this.productService.createProduct(product).subscribe();

    Swal.fire({
      title: 'New product created!',
      icon: 'success'
    }).then( ()=>{
      this.router.navigate(['/admin/product-list']);
    });
  }
}
