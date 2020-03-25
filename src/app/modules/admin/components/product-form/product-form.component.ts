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

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  uploadPercentage$: Observable<any>;
  imageFolderPath = environment.imageFolderPath;
  imageUrl: string;
  productForm: FormGroup;
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
      id: ['', [ Validators.required ]],
      image: [''],
      title: ['', [ Validators.required ]],
      price: ['', [ Validators.required, MyValidators.IsValidPrice ]],
      description: ['', [ Validators.required ]]
    });
  }

  ngOnInit() {
  }

  uploadFile(event) {
    this.waitingUpload = true;
    this.uploadComplete = false;
    const file = event.target.files[0];

    // Generate file name
    const date = new Date();
    const time = date.getTime();
    const fileName = time + file.name;
    const imagePath = `${this.imageFolderPath}/${fileName}`;

    // Start upload file task
    const task = this.storage.upload(imagePath, file);

    // Get upload progress
    this.uploadPercentage$ = task.percentageChanges().pipe(
      map(percentage => {
        return percentage.toFixed(0);
      })
    );

    // Get image HTTP URL
    const fileRef = this.storage.ref(imagePath);

    const lastSnapshot = task.snapshotChanges().pipe(
      takeLast(1)
    ).toPromise();

    lastSnapshot.then(() => {
      fileRef.getDownloadURL().subscribe(url => {
        this.imageUrl = url;
        this.imageField.setValue(url); // The form data to submit
        this.waitingUpload = false;
        this.uploadComplete = true;
      });
    });
  }

  submitForm(product) {

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
