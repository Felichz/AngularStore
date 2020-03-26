import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MyValidators } from 'src/app/utils/validators';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ProductsService } from 'src/app/core/services/products/products.service';

import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { ProductInterface } from 'src/app/interfaces/product-interface';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { map, takeLast } from 'rxjs/operators';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  id: string;
  ready: boolean;
  imageFolderPath = environment.imageFolderPath;
  uploadPercentage$: Observable<any>;
  imageUrl: string;
  productForm: FormGroup;
  invalidFormSubmit = false;
  waiting = false;
  waitingUpload = false;
  uploadComplete = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductsService,
    private storage: AngularFireStorage
  ) {
    this.route.params.subscribe( (params: Params) => {
      this.id = params.id;
    });
  }

  ngOnInit() {
    this.productService.getProduct( this.id )
      .subscribe( product => {

        this.imageUrl = product.image;
        if (product) {
          this.productForm = this.formBuilder.group({
            image: [product.image],
            title: [product.title, [ Validators.required ]],
            price: [product.price, [ Validators.required, MyValidators.IsValidPrice ]],
            description: [product.description, [ Validators.required ]]
          });
        }

        this.ready = true;
      });
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
        this.productForm.get('image').setValue(url); // The form data to submit
        this.waitingUpload = false;
        this.uploadComplete = true;
      });
    });
  }

  submitForm(product: Partial<ProductInterface>) {

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
