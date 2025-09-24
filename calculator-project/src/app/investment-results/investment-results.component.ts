import { Component, input, Input } from "@angular/core";
import { InvestmentResultsData } from "../investment-results.model";
import { CurrencyPipe } from "@angular/common";
import { InvestmentService } from "../investment.service";

@Component({
  selector: 'app-investment-results',
  standalone: true,
  templateUrl: './investment-results.component.html',
  styleUrl: './investment-results.component.css',
  imports: [CurrencyPipe]
})
export class InvestmentResultsComponent {
  //@Input({required: true}) investmentResults?: InvestmentResultsData[];

  //Using signals
  //investmentResults = input<InvestmentResultsData []>();

  //Using service to get data instead of input decorator
  constructor(private investmentService: InvestmentService) {}

  //getter method to pass the data to html
  get investmentResults() {
    return this.investmentService.investmentResults;
  }
}