import { Component, EventEmitter, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CalculationInputData } from "./user-input.model";

@Component({
  selector: 'app-user-input',
  standalone: true,
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css',
  imports: [FormsModule]
})
export class UserInputComponent {
  @Output() calculate = new EventEmitter<CalculationInputData>();
  enteredIntialInvestment = '0';
  enteredAnnaulInvestment = '0';
  enteredExpectedReturn = '0';
  enteredDuration = '0';

  onUserInputFormSubmission() {
    this.calculate.emit({
      initialInvestment: Number(this.enteredIntialInvestment),
      annualInvestment: +this.enteredAnnaulInvestment,
      expectedReturn: +this.enteredExpectedReturn,
      duration: +this.enteredDuration
    })
  }
}