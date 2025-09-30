import { Component, Input } from '@angular/core';

@Component({
  selector: 'button[appButton]', //some what like property binding. This component gets activates for all button elements having appButton attribute in it.
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  @Input({required: true}) buttonData!: {name: string, symbol: string};
}
