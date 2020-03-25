import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MyValidators } from 'src/app/utils/validators';
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
  invalidFormSubmit = false;
  waiting = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private productService: ProductsService
  ) {
    this.productForm = this.formBuilder.group({
      id: ['', [ Validators.required ]],
      title: ['', [ Validators.required ]],
      price: ['', [ Validators.required, MyValidators.IsValidPrice ]],
      description: ['', [ Validators.required ]]
    });
  }

  ngOnInit() {
  }

  submitForm(product, event) {

    product.id = product.id.toString();

    if (this.productForm.valid) {

      this.waiting = true;

      this.productService.createProduct(product).subscribe(response => {

        this.waiting = false;
        Swal.fire({
          title: 'New product created!',
          icon: 'success'
        }).then( () => {
          this.router.navigate(['/admin/product-list']);
        });
      });
    } else {
      this.invalidFormSubmit = true;
    }
  }

  get priceField() {
    return this.productForm.get('price');
  }

  get idField() {
    return this.productForm.get('id');
  }

  get titleField() {
    return this.productForm.get('title');
  }

  get descriptionField() {
    return this.productForm.get('description');
  }
}
