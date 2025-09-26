import { Component, Input, input } from "@angular/core";

@Component({
  selector: 'app-dashboard-item',
  standalone: true,
  templateUrl: './dashboard-item.component.html',
  styleUrl: './dashboard-item.component.css'
})
export class DashboardItemComponent {
  // @Input({required: true}) image!: {src: string, alt: string};
  // @Input({required: true}) title!: string;

  //Using input methods
  image = input.required<{src: string, alt: string}>();
  title = input.required<string>();
}