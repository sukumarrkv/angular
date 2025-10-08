import { Component, input, ViewEncapsulation } from '@angular/core';

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
}
