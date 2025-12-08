import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit {
  places = signal<Place[] | undefined>(undefined);
  isFetchingPlaces = signal(false);
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.isFetchingPlaces.set(true);
    const getSubscription = this.httpClient.get<{places: Place[]}>("http://localhost:3000/places")
    .pipe(map((response) => response.places))
    .subscribe({
      next: (places) => {
        //console.log(response.places);
        this.places.set(places);
      },
      error: (error) => {
        console.log(error.message);
      },
      complete: () => {
        this.isFetchingPlaces.set(false);
      }
    });

    this.destroyRef.onDestroy(() => {
      getSubscription.unsubscribe();
    })
  }
}
