import { Directive, ElementRef, inject, input } from "@angular/core";

@Directive({
  //This means this directive will apply to all anchor 'a' tags with appSafeLink attribute 
  selector: 'a[appSafeLink]',
  standalone: true,
  host: {
    '(click)': 'onConfirmLeavePage($event)'
  }
})
export class SafeLinkDirective {
  queryParam = input('myapp');

  //We can use dependency injection in directives as well. Below is the code to inject the host element of this directive
  private hostElement = inject<ElementRef<HTMLAnchorElement>>(ElementRef);
  constructor() {
    console.log('Safe Link Directive is active');
  }

  onConfirmLeavePage(event: MouseEvent) {
    const confirmNavigate = window.confirm('Do you want to leave this app?');

    if(confirmNavigate) {
      //Using hostelement to get address
      //const address = this.hostElement.nativeElement.href;
      //this.hostElement.nativeElement.href = address + '?from=' + this.queryParam();
      const address = (event.target as HTMLAnchorElement).href;
      (event.target as HTMLAnchorElement).href = address + '?from=' + this.queryParam();
      return;
    }

    event.preventDefault();
  }
}