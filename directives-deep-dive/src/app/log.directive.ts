import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[appLog]',
  standalone: true,
  host: {
    '(click)': 'log()'
  }
})
export class LogDirective {
  private elementRef = inject(ElementRef);
  constructor() { }

  log() {
    console.log('Clicked');
    console.log(this.elementRef.nativeElement);
  }

}
