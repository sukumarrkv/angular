import { Component } from "@angular/core";
import { NewTicketComponent } from "./new-ticket/new-ticket.component";

@Component({
  selector: 'app-ticket',
  standalone: true,
  templateUrl:'./ticket.component.html',
  styleUrl: './ticket.component.css',
  imports: [NewTicketComponent]
})
export class TicketComponent {
  
}