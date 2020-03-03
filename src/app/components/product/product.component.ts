import {
    Component,
    Input,
    EventEmitter,
    Output,
    OnChanges,
    OnInit,
    OnDestroy
} from '@angular/core';
import { ProductInterface } from 'src/app/interfaces/product-interface';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnChanges, OnInit, OnDestroy {

    @Input() product: ProductInterface;
    @Output() addToCartEvent: EventEmitter<number>;
    @Output() destroyProductEvent: EventEmitter<string>;
    today: Date;
    count: number;
    destroyed: boolean;

    constructor() {
        this.today = new Date();
        this.count = 0;
        this.destroyed = false;
        this.addToCartEvent = new EventEmitter();
        this.destroyProductEvent = new EventEmitter();

        this.count++;
        console.log(`${this.count}: constructor, product id: '${this.product}'`);
    }

    ngOnChanges( changes ) {
        this.count++;
        // tslint:disable-next-line: max-line-length
        console.log(`${this.count}: ngOnChanges, product id: '${this.product.id}', the previous value was ${changes.product.previousValue}`);
    }

    ngOnInit() {
        this.count++;
        console.log(`${this.count}: ngOnInit, product id: '${this.product.id}'`);
    }

    ngOnDestroy() {
        this.count++;
        console.log(`${this.count}: ngOnDestroy, destroyed item ${this.product.id}`);
    }

    addToCartClicked() {
        console.log('');
        console.log(`[${this.product.id}] ProductComponent: addToCartClicked`);

        this.addToCartEvent.emit( parseInt(this.product.id, 10) );
    }

    destroyProductClicked() {
        this.destroyProductEvent.emit( this.product.id );
    }
}
