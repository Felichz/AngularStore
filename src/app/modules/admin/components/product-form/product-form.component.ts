import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { ProductForm } from 'src/app/modules/admin/utils/product-form';
import { ProductsService } from 'src/app/core/services/products/products.service';
import { AngularFireStorage } from '@angular/fire/storage';

import Swal from 'sweetalert2';
@Component({
    selector: 'app-product-form',
    templateUrl: './product-form.component.html',
    styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent extends ProductForm implements OnInit {
    constructor(
        formBuilder: FormBuilder,
        router: Router,
        productService: ProductsService,
        storage: AngularFireStorage
    ) {
        super(formBuilder, router, productService, storage);
    }

    ngOnInit() {}

    submitForm() {
        const tmpFormValue = this.productForm.value;

        if (this.productForm.valid) {
            this.disableForm();
            this.uploadFile().then(() => {
                this.productService
                    .createProduct({ ...tmpFormValue, image: this.imageUrl })
                    .then(() => {
                        this.enableForm();
                        Swal.fire({
                            title: 'New product created!',
                            icon: 'success',
                        }).then(() => {
                            this.router.navigate(['/admin/product-list']);
                        });
                    });
            });
        } else {
            this.invalidFormSubmit = true;
        }
    }
}
