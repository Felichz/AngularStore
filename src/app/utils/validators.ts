import { AbstractControl } from '@angular/forms';

export class MyValidators {

    static IsValidPrice( priceField: AbstractControl ) {
        const price = priceField.value;
        if ( price > 10000 ) {
            return { too_high: true };
        } else {
            return true;
        }
    }
}
