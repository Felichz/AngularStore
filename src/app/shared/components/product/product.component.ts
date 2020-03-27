import {
    Component,
    Input,
    EventEmitter,
    Output,
    OnChanges,
    OnInit,
    OnDestroy,
    AfterViewInit
} from '@angular/core';

import { ProductInterface } from 'src/app/interfaces/product-interface';
import { CartService } from 'src/app/core/services/cart/cart.service';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

    @Input() product: ProductInterface;
    @Output() addToCartEvent: EventEmitter<number>;
    today: Date;

    bgImageCss: string;
    productCount: number;

    constructor(
        private cartService: CartService
    ) {
        this.today = new Date();
        this.addToCartEvent = new EventEmitter();
    }

    ngOnInit() {
        this.cartService.cart.subscribe(cartProducts => {
            const cartProduct = cartProducts.find(product => {
                return product.id === this.product.id ? true : false;
            });

            if (cartProduct) {
                this.productCount = cartProduct.quantity;
            } else {
                this.productCount = null;
            }
        });
    }

    addToCartClicked() {
        this.cartService.addProduct(this.product);

        this.addToCartEvent.emit( parseInt(this.product.id, 10) );
    }
}
