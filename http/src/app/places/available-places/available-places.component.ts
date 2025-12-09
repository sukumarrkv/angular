import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { PlacesService } from '../places.service';

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
  error = signal('');
  private placesService = inject(PlacesService);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.isFetchingPlaces.set(true);
    const getSubscription = this.placesService.loadAvailablePlaces()
    .subscribe({
      next: (places) => {
        //console.log(response.places);
        this.places.set(places);
      },
      error: (error) => {
        console.log(error.message);
        this.error.set('Something went worng while fetching places. Please try again later.');
      },
      complete: () => {
        this.isFetchingPlaces.set(false);
      }
    });

    this.destroyRef.onDestroy(() => {
      getSubscription.unsubscribe();
    })
  }

  onSelectedPlace(selectedPlace: Place) {
    const subscription = this.placesService.addPlaceToUserPlaces(selectedPlace).subscribe({
      next: (response) => {
        console.log(response);
      }
    })

    this.destroyRef.onDestroy(()  => {
      subscription.unsubscribe();
    })
  }
}
