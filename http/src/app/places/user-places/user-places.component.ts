import { Component, DestroyRef, inject, input, OnInit, signal } from '@angular/core';

import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-user-places',
  standalone: true,
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.css',
  imports: [PlacesContainerComponent, PlacesComponent],
})
export class UserPlacesComponent implements OnInit{
  //places = signal<Place[] | undefined>(undefined); with using this we need to refresh everytime we add a new user places
  isFetchingPlaces = signal(false);
  error = signal('');
  private placesService = inject(PlacesService);
  private destroRef = inject(DestroyRef);
  places = this.placesService.loadedUserPlaces;

  ngOnInit(): void {
    this.isFetchingPlaces.set(true);
    const fetchingUserPlacesSubscription = this.placesService.loadUserPlaces().subscribe({
      error: (error) => {
        console.log(error);
        this.error.set('Something went wrong while fetching your favourite places. Please try again later');
      },

      complete: () => {
        this.isFetchingPlaces.set(false);
      }
    })

    this.destroRef.onDestroy(() => {
      fetchingUserPlacesSubscription.unsubscribe();
    })
  }

}
