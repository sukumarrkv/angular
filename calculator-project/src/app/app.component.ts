import { Component, signal } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { UserInputComponent } from './user-input/user-input.component';
import { InvestmentInputData } from './investment-input.model';
import { InvestmentResultsComponent } from "./investment-results/investment-results.component";
import { InvestmentResultsData } from './investment-results.model';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [HeaderComponent, UserInputComponent, InvestmentResultsComponent]
})
export class AppComponent {

  /* By using service to calculate we no longer need this code.
  //Without signals
  //investmentResults?: InvestmentResultsData[];

  //WithSignals
  investmentResults = signal<InvestmentResultsData[] | undefined>(undefined);

calculateInvestmentResults(data: InvestmentInputData) {
  const {initialInvestment, annualInvestment, expectedReturn, duration} = data;
  const annualData = [];
  let investmentValue = initialInvestment;

  for (let i = 0; i < duration; i++) {
    const year = i + 1;
    const interestEarnedInYear = investmentValue * (expectedReturn / 100);
    investmentValue += interestEarnedInYear + annualInvestment;
    const totalInterest =
      investmentValue - annualInvestment * year - initialInvestment;
    annualData.push({
      year: year,
      interest: interestEarnedInYear,
      valueEndOfYear: investmentValue,
      annualInvestment: annualInvestment,
      totalInterest: totalInterest,
      totalAmountInvested: initialInvestment + annualInvestment * year,
    });
  }

  //this.investmentResults = annualData;
  this.investmentResults.set(annualData);
}*/
}
