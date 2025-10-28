import { Component, OnDestroy, OnInit } from "@angular/core";

@Component({
  selector: 'app-server-status',
  standalone: true,
  templateUrl: './server-status.componenet.html',
  styleUrl: './server-status.componenet.css'
})
export class ServerStatusComponent implements OnInit, OnDestroy {
  //currentStatus = 'offline';
  //Angular will allow us to assign any values for currentStatus as it is a string
  //To restrict for some define values use as below
  currentStatus: 'online' | 'offline' | 'unknown' = 'online';
  //private interval?: NodeJS.Timeout;
  private interval?: ReturnType<typeof setInterval>;

  //Dynamically setting current status using random

  ngOnInit() {
    this.interval = setInterval(() => {
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

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}