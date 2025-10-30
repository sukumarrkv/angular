import { Component, ElementRef, ViewChild, viewChild } from '@angular/core';
import { ButtonComponent } from "../../../shared/button/button.component";
import { ControlComponent } from "../../../shared/control/control.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [ControlComponent, ButtonComponent, FormsModule],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css'
})
export class NewTicketComponent {
  //@ViewChild('newTitleForm') form?: ElementRef<HTMLFormElement>;
  //Using signal to get form element
  private form = viewChild<ElementRef<HTMLFormElement>>('newTitleForm');

  onSubmit(titleInput: HTMLInputElement, textInput: String) {
    console.log(titleInput.value + ":" + textInput);
    //this.form?.nativeElement.reset();
    //Using signals
    this.form()?.nativeElement.reset();
  }
}
