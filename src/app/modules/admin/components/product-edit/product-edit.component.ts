import { Component, OnInit } from '@angular/core';
import {
    FormGroup,
    FormBuilder,
    Validators,
    ValidatorFn,
} from '@angular/forms';
import { MyValidators } from 'src/app/utils/validators';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ProductForm } from 'src/app/modules/admin/utils/product-form';
import { ProductsService } from 'src/app/core/services/products/products.service';

import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { ProductInterface } from 'src/app/interfaces/product-interface';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { map, takeLast, first } from 'rxjs/operators';

import { ProductFormComponent } from '../product-form/product-form.component';
import { resolve } from 'url';

@Component({
    selector: 'app-product-edit',
    templateUrl: './product-edit.component.html',
    styleUrls: ['./product-edit.component.scss'],
})
export class ProductEditComponent extends ProductForm implements OnInit {
    id: string;
    ready: boolean;
    notFound = false;
    imageFolderPath = environment.imageFolderPath;
    newImageUploaded = false;
    initialProduct: ProductInterface;

    constructor(
        formBuilder: FormBuilder,
        router: Router,
        productService: ProductsService,
        storage: AngularFireStorage,
        private route: ActivatedRoute
    ) {
        super(formBuilder, router, productService, storage);
        this.productForm = null;

        this.route.params.subscribe((params: Params) => {
            this.id = params.id;
        });
    }

    createFormGroup(product) {
        super.createFormGroup(product);
        this.imageField.clearValidators();
        this.imageField.setValidators(Validators.required);
    }

    ngOnInit() {
        this.productService
            .getProduct(this.id)
            .pipe(first())
            .subscribe((product) => {
                this.imageUrl = product.image;

                if (product.title) {
                    // If product exist
                    this.createFormGroup(product);
                } else {
                    // If not
                    this.notFound = true;
                }

                this.initialProduct = this.product;

                this.ready = true;
            });
    }

    selectFile(event) {
        if (!this.newImageUploaded) {
            this.imageField.setValidators(this.imageFieldValidators);
            this.newImageUploaded = true;
        }
        super.selectFile(event);
    }

    submitForm() {
        // This is because the form data get deleted when
        // the form fields are disabled
        const tmpFormValue = this.productForm.value;

        if (this.productForm.valid) {
            this.waiting = true;
            this.disableForm();

            // If the user picked a new image, then we must upload it
            // before updating the product
            new Promise((end) => {
                if (this.imageField.dirty) {
                    this.uploadFile().then(end);
                } else {
                    end();
                }
            }).then(() => {
                this.updateProduct({ ...tmpFormValue, image: this.imageUrl });
            });
        } else {
            this.invalidFormSubmit = true;
        }
    }

    updateProduct(product) {
        if (JSON.stringify(product) !== JSON.stringify(this.initialProduct)) {
            this.productService.updateProduct(this.id, product).then(() => {
                this.enableForm();

                Swal.fire({
                    title: 'Product modified!',
                    icon: 'success',
                }).then(() => {
                    this.router.navigate(['/admin/product-list']);
                });
            });
        } else {
            this.enableForm();

            Swal.fire({
                title: 'The product has no changes',
                icon: 'info',
            });
        }
    }
}
