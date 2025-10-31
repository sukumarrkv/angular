import { Component, input, output, signal } from '@angular/core';
import { Ticket } from '../tickets.module';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css'
})
export class TicketComponent {
  ticketData = input.required<Ticket>();
  closeTicket = output();
  detailsVisible = signal(false);

  onToggleDetails() {
    this.detailsVisible.set(!this.detailsVisible());
  }

  onMarkAsCompleted() {
    this.closeTicket.emit();
  }
}
