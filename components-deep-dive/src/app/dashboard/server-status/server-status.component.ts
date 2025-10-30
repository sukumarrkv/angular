import { Component, effect, OnDestroy, OnInit, signal } from "@angular/core";

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
  //currentStatus: 'online' | 'offline' | 'unknown' = 'online';

  //Converting above variable to signal. By doint this Angular will set up a subscription for use and 
  //look for changes to this variable and update the HTML accordingly.
  //To set up a subscription and look for changes made to this variable in type script file we must use effect
  //as shown in contructor class
  currentStatus = signal<'online' | 'offline' | 'unknown'>('offline');
  //private interval?: NodeJS.Timeout;
  private interval?: ReturnType<typeof setInterval>;

  //Dynamically setting current status using random

  constructor(){
    effect(() => {
      console.log(this.currentStatus());
    })
  }

  ngOnInit() {
    this.interval = setInterval(() => {
      const random = Math.random(); //0 to 0.9999999999999

      if(random < 0.5) {
        this.currentStatus.set('online');
      } else if(random < 0.9) {
        this.currentStatus.set('offline');
      } else {
        this.currentStatus.set('unknown');
      }
    }, 3000)
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}