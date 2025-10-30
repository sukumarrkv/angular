import { Component, ContentChild, ElementRef, inject, input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css',
  //Below setting will apply styles to the html elements projected using ng-content
  encapsulation: ViewEncapsulation.None,
  //This adds properties to the host elementsas below
  //<app-control class="control" />
  host: {
    class: 'control'
  }
})
export class ControlComponent {
  label = input.required<string>();
  //private element = inject(ElementRef);
  //TO get html elements using template variables which are projected using content projection
  //We have contentChild method which uses signals
  @ContentChild('input') control?: ElementRef<HTMLInputElement | HTMLTextAreaElement>;
}
