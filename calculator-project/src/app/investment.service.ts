import { Injectable } from "@angular/core";
import { InvestmentInputData } from "./investment-input.model";
import { InvestmentResultsData } from "./investment-results.model";

@Injectable({providedIn: 'root'})
export class InvestmentService {
  investmentResults?: InvestmentResultsData[];

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
  
    this.investmentResults = annualData;
  }
}