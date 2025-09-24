import { Component, EventEmitter, output, Output, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { InvestmentInputData } from "../investment-input.model";

@Component({
  selector: 'app-user-input',
  standalone: true,
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css',
  imports: [FormsModule]
})
export class UserInputComponent {
  //@Output() calculate = new EventEmitter<InvestmentInputData>();
  // enteredIntialInvestment = '0';
  // enteredAnnaulInvestment = '0';
  // enteredExpectedReturn = '5';
  // enteredDuration = '10';

  //Using signals
  calculate = output<InvestmentInputData>();
  enteredIntialInvestment = signal('0');
  enteredAnnaulInvestment = signal('0');
  enteredExpectedReturn = signal('5');
  enteredDuration = signal('10');

  onUserInputFormSubmission() {
    this.calculate.emit({
      initialInvestment: Number(this.enteredIntialInvestment()),
      annualInvestment: +this.enteredAnnaulInvestment(),
      expectedReturn: +this.enteredExpectedReturn(),
      duration: +this.enteredDuration()
    })
  }
}