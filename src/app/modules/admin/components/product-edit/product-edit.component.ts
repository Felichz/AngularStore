import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MyValidators } from 'src/app/utils/validators';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ProductsService } from 'src/app/core/services/products/products.service';

import Swal from 'sweetalert2';
import { ProductInterface } from 'src/app/interfaces/product-interface';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  id: string;
  ready: boolean;
  productForm: FormGroup;
  invalidFormSubmit = false;
  waiting = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductsService
  ) {
    this.route.params.subscribe( (params: Params) => {
      this.id = params.id;
    });
  }

  ngOnInit() {
    this.productService.getProduct( this.id )
      .subscribe( product => {

        if (product) {
          this.productForm = this.formBuilder.group({
            title: [product.title, [ Validators.required ]],
            price: [product.price, [ Validators.required, MyValidators.IsValidPrice ]],
            description: [product.description, [ Validators.required ]]
          });
        }

        this.ready = true;
      });
  }

  submitForm(product: Partial<ProductInterface>, event) {

    if (this.productForm.valid) {

      this.waiting = true;

      this.productService.updateProduct(this.id, product).subscribe(() => {

        this.waiting = false;
        Swal.fire({
          title: 'Product modified!',
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
