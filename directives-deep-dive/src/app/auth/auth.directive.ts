import { Directive, effect, inject, input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Permission } from './auth.model';
import { AuthService } from './auth.service';

@Directive({
  selector: '[appAuth]',
  standalone: true
})
export class AuthDirective {
  userType = input.required<Permission>({alias: 'appAuth'});
  private authService = inject(AuthService);
  //Below two ref are used to show the html content conditionally
  private templateRef = inject(TemplateRef);
  private viewContainerRef = inject(ViewContainerRef);

  constructor() { 
    //Effect is a special method that gets executed whenever signal input value gets changed
    effect(() => {
      if(this.authService.activePermission() === this.userType()) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
        //console.log('Show content');
      } else {
        this.viewContainerRef.clear();
        //console.log('Don not sow content');
      }
    })
  }

}
