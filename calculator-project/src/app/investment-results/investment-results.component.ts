import { Component, input, Input } from "@angular/core";
import { InvestmentResultsData } from "../investment-results.model";
import { CurrencyPipe } from "@angular/common";

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
  investmentResults = input<InvestmentResultsData []>();
}