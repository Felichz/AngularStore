import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pow'
})
export class PowPipe implements PipeTransform {

  transform(value: number, exponent: number): number {
    return Math.pow(value, exponent);
  }

}
