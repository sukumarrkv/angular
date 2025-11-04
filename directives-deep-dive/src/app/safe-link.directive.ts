import { Directive } from "@angular/core";

@Directive({
  //This means this directive will apply to all anchor 'a' tags with appSafeLink attribute 
  selector: 'a[appSafeLink]',
  standalone: true,
  host: {
    '(click)': 'onConfirmLeavePage($event)'
  }
})
export class SafeLinkDirective {
  constructor() {
    console.log('Safe Link Directive is active');
  }

  onConfirmLeavePage(event: MouseEvent) {
    const confirmNavigate = window.confirm('Do you want to leave this app?');

    if(confirmNavigate) {
      return;
    }

    event.preventDefault();
  }
}