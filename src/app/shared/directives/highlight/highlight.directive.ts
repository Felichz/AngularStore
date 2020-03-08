import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor( element: ElementRef ) {
    const elementStyle = element.nativeElement.style;
    elementStyle.background = 'black';
    elementStyle.fontWeight = 'bold';
    elementStyle.color = 'white';
  }

}
