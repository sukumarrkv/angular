import { Component } from "@angular/core";
import { NewTicketComponent } from "./new-ticket/new-ticket.component";
import { Ticket } from "./tickets.module";
import { Title } from "@angular/platform-browser";
import { TicketComponent } from "./ticket/ticket.component";

@Component({
  selector: 'app-tickets',
  standalone: true,
  templateUrl:'./tickets.component.html',
  styleUrl: './tickets.component.css',
  imports: [NewTicketComponent, TicketComponent]
})
export class TicketsComponent {
  tickets : Ticket [] = [];

  addNewTicket(newTicketData: {title: string, request: string}) {
    const ticket: Ticket = {
      id: Math.random().toString(),
      title: newTicketData.title,
      request: newTicketData.request,
      status: 'Open'
    };

    this.tickets.push(ticket);
  }

  onCloseTicket(id: string) {
    this.tickets = this.tickets.map((ticket) => {
      if(ticket.id === id) {
        return {...ticket, 'status': 'Closed'};
      } else {
        return ticket;
      }
    })
  }
}