import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MyValidators } from 'src/app/utils/validators';
import { Router } from '@angular/router';

import { ProductsService } from 'src/app/core/services/products/products.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';

import Swal from 'sweetalert2';
import { takeLast, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

const A_MEBIBYTE_IN_BYTES = 1049000;
@Component({
    selector: 'app-product-form',
    templateUrl: './product-form.component.html',
    styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
    uploadPercentage$: Observable<any>;
    selectedFile: File = null;
    productForm: FormGroup;
    formDisabled = false;
    invalidFormSubmit = false;
    waiting = false;
    waitingUpload = false;
    uploadComplete = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private productService: ProductsService,
        private storage: AngularFireStorage
    ) {
        this.productForm = this.formBuilder.group({
            image: [
                '',
                [
                    Validators.required,
                    MyValidators.requiredFileTypes(['image/jpeg', 'image/png']),
                    MyValidators.maxFileSize(A_MEBIBYTE_IN_BYTES),
                ],
            ],
            title: ['', [Validators.required]],
            price: ['', [Validators.required, MyValidators.IsValidPrice]],
            description: ['', [Validators.required]],
        });
    }

    ngOnInit() {}

    selectFile(event) {
        this.selectedFile = event.target.files[0];
        this.imageField.setValue(this.selectedFile);
        this.imageField.markAsDirty();
    }

    uploadFile() {
        if (this.selectedFile === null) {
            return null;
        }

        this.waitingUpload = true;
        this.uploadComplete = false;
        const file = this.selectedFile;

        // Generate file name
        const date = new Date();
        const time = date.getTime();
        const fileName = time + file.name;

        const imagePath = `${environment.imageFolderPath}/${fileName}`;

        // Start file upload task
        const task = this.storage.upload(imagePath, file);

        // Get upload progress
        this.uploadPercentage$ = task.percentageChanges().pipe(
            map((percentage) => {
                return percentage.toFixed(0);
            })
        );

        // Get image HTTP URL
        const fileRef = this.storage.ref(imagePath);

        const lastSnapshot = task
            .snapshotChanges()
            .pipe(takeLast(1))
            .toPromise();

        return new Promise((resolve) => {
            lastSnapshot.then(() => {
                fileRef.getDownloadURL().subscribe((url) => {
                    this.waitingUpload = false;
                    this.uploadComplete = true;

                    resolve(url);
                });
            });
        });
    }

    submitForm() {
        const tmpFormValue = this.productForm.value;

        if (this.productForm.valid) {
            this.waiting = true;
            this.disableForm();

            this.uploadFile().then((url) => {
                this.productService
                    .createProduct({ ...tmpFormValue, image: url })
                    .then(() => {
                        this.waiting = false;
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

    toggleForm(shouldDisable) {
        const toggleFields = [
            this.titleField,
            this.priceField,
            this.descriptionField,
        ];

        toggleFields.forEach((field) => {
            if (shouldDisable) {
                field.disable();
            } else {
                field.enable();
            }
        });
    }

    disableForm() {
        this.toggleForm(1);
    }

    enableForm() {
        this.toggleForm(0);
    }

    get priceField() {
        return this.productForm.get('price');
    }

    get imageField() {
        return this.productForm.get('image');
    }

    get titleField() {
        return this.productForm.get('title');
    }

    get descriptionField() {
        return this.productForm.get('description');
    }
}
