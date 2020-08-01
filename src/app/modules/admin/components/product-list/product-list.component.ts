import { Component, OnInit } from '@angular/core';
import { ProductInterface } from 'src/app/interfaces/product-interface';
import { ProductsService } from 'src/app/core/services/products/products.service';
import 'src/environments/environment';
import { AngularFireStorage } from '@angular/fire/storage';

import Swal from 'sweetalert2';
import { fromEvent } from 'rxjs';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
    displayedColumns: string[] = [
        'image',
        'id',
        'title',
        'price',
        'description',
        'actions',
    ];
    products: ProductInterface[];

    maxMobileWidth = 900;
    mobileList: boolean;

    constructor(
        private productsService: ProductsService,
        private storage: AngularFireStorage
    ) {}

    ngOnInit() {
        console.log('ProductListComponent init');
        this.fetchProducts();

        this.checkWindowWidth();

        fromEvent(window, 'resize').subscribe(() => {
            this.checkWindowWidth();
        });
    }

    checkWindowWidth() {
        this.mobileList = window.innerWidth < this.maxMobileWidth;
    }

    fetchProducts() {
        this.productsService.getAllProducts().subscribe((products) => {
            this.products = products;
        });
    }

    deleteProduct(id: string) {
        const executeDelete = () => {
            this.productsService.getProduct(id).subscribe((product) => {
                const imgRef = this.storage.storage.refFromURL(product.image);
                imgRef.delete();
            });

            this.productsService.deleteProduct(id).then(() => {
                Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
            });
        };

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.value) {
                executeDelete();
            }
        });
    }
}
