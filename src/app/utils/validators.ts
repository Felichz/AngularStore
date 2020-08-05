import { AbstractControl, ValidatorFn } from '@angular/forms';

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
                return {};
            }
            if (!allowedTypes.includes(imageField.value.type)) {
                return { file_type: true };
            } else {
                return {};
            }
        };
    }

    static maxFileSize(maxSize: number) {
        return (imageField: AbstractControl) => {
            if (!imageField) {
                return {};
            }
            if (imageField.value.size > maxSize) {
                return { size_exceeded: true };
            } else {
                return {};
            }
        };
    }
}
