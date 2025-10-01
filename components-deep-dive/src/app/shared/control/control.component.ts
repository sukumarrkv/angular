import { Component, input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css',
  //Below setting will apply styles to the html elements projected using ng-content
  encapsulation: ViewEncapsulation.None
})
export class ControlComponent {
  label = input.required<string>();
}
