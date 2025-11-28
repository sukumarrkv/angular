import { Component, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { interval, map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{
  count = signal(0);
  private destroyRef = inject(DestroyRef);

  constructor() {
    effect(() => {
      console.log(`Clicked button ${this.count()} times.`);
    })
  }

  ngOnInit(): void {
    // interval(1000).subscribe({
    //   next: (value) => console.log(value),
    //   error: () => console.log("Error occurred")
    // })
    
    //interval is a special observable which emits the data (number from 0) in regualr interval.
    //In above case we created observable object and passed into subscribe method, here we directly 
    //passed a function which will be excuted for every value emitted by observable
    const intervalSubcription = interval(2000).subscribe((val) => {
      console.log(val)
    });

    // //Below is the code we use observables with operators
    // interval(2000).pipe(map((val) => val *2)).subscribe({
    //   next: (value) => console.log(value)
    // });

    this.destroyRef.onDestroy(() => {
      intervalSubcription.unsubscribe(); //good practice to unsubscribe so there are no memory leaks
    });
  }

  onClick() {
    this.count.update((previousCount) => previousCount + 1);
  }
}
