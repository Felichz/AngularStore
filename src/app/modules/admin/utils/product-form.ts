import {
    FormGroup,
    FormBuilder,
    Validators,
    ValidatorFn,
} from '@angular/forms';
import { MyValidators } from 'src/app/utils/validators';
import { Router } from '@angular/router';

import { UploadImage } from 'src/app/modules/admin/utils/upload-image';
import { ProductsService } from 'src/app/core/services/products/products.service';
import { AngularFireStorage } from '@angular/fire/storage';

import { ProductInterface } from 'src/app/interfaces/product-interface';

const A_MEBIBYTE_IN_BYTES = 1049000;

export class ProductForm extends UploadImage {
    productForm: FormGroup;
    formDisabled = false;
    invalidFormSubmit = false;
    selectedFile: File = null;
    imageFieldValidators: ValidatorFn[] = [
        Validators.required,
        MyValidators.requiredFileTypes(['image/jpeg', 'image/png']),
        MyValidators.maxFileSize(A_MEBIBYTE_IN_BYTES),
    ];
    waiting = false;

    constructor(
        protected formBuilder: FormBuilder,
        protected router: Router,
        protected productService: ProductsService,
        protected storage: AngularFireStorage
    ) {
        super(storage);
        this.createFormGroup();
    }

    createFormGroup(product: ProductInterface = null) {
        product = {
            image: '',
            title: '',
            price: '',
            description: '',
            ...product,
        };

        this.productForm = this.formBuilder.group({
            image: [product.image, this.imageFieldValidators],
            title: [product.title, [Validators.required]],
            price: [
                product.price,
                [Validators.required, MyValidators.IsValidPrice],
            ],
            description: [product.description, [Validators.required]],
        });
    }

    selectFile(event) {
        this.selectedFile = event.target.files[0];
        this.imageField.setValue(this.selectedFile);
        this.imageField.markAsDirty();
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
        this.waiting = true;
        this.toggleForm(1);
    }

    enableForm() {
        this.waiting = false;
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

    get product() {
        return { ...this.productForm.value, image: this.imageUrl };
    }
}
