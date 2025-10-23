import { Component } from "@angular/core";

@Component({
  selector: 'app-server-status',
  standalone: true,
  templateUrl: './server-status.componenet.html',
  styleUrl: './server-status.componenet.css'
})
export class ServerStatusComponent {
  //currentStatus = 'offline';
  //Angular will allow us to assign any values for currentStatus as it is a string
  //To restrict for some define values use as below
  currentStatus: 'online' | 'offline' | 'unknown' = 'online';

  //Dynamically setting current status using random

  ngOnInit() {
    setInterval(() => {
      const random = Math.random(); //0 to 0.9999999999999

      if(random < 0.5) {
        this.currentStatus = 'online';
      } else if(random < 0.9) {
        this.currentStatus = 'offline';
      } else {
        this.currentStatus = 'unknown';
      }
    }, 3000)
  }
}