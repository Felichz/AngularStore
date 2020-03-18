import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MyValidators } from 'src/app/utils/validators';
import { Router, ActivatedRoute } from '@angular/router';

import { ProductsService } from 'src/app/core/services/products/products.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  id: string;
  ready: boolean;
  productForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductsService
  ) {
    this.route.params.subscribe( params => {
      this.id = params.id;
    });

    this.productService.getProduct( this.id )
      .subscribe( product => {

        if (product) {
          this.productForm = this.formBuilder.group({
            id: [product.id, [ Validators.required ]],
            title: [product.title, [ Validators.required ]],
            price: [product.price, [ Validators.required, MyValidators.IsValidPrice ]],
            description: [product.description, [ Validators.required ]]
          });
        }

        this.ready = true;
      });
  }

  ngOnInit() {
  }

  submitForm(product, event) {

    this.productService.updateProduct(this.id, product).subscribe();

    Swal.fire({
      title: 'Product modified!',
      icon: 'success'
    }).then( () => {
      this.router.navigate(['/admin/product-list']);
    });
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
