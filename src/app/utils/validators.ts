import { AbstractControl } from '@angular/forms';

export class MyValidators {
    static IsValidPrice(priceField: AbstractControl) {
        const price = priceField.value;
        if (price > 10000) {
            return { too_high: true };
        } else {
            return true;
        }
    }

    static requiredFileTypes(allowedTypes: string[]) {
        return (imageField: AbstractControl) => {
            if (!imageField) {
                return true;
            }
            if (!allowedTypes.includes(imageField.value.type)) {
                return { file_type: true };
            } else {
                return true;
            }
        };
    }

    static maxFileSize(maxSize: number) {
        return (imageField: AbstractControl) => {
            if (!imageField) {
                return true;
            }
            if (imageField.value.size > maxSize) {
                return { size_exceeded: true };
            } else {
                return true;
            }
        };
    }
}
