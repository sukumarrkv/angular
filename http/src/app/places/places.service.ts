import { inject, Injectable, signal } from '@angular/core';

import { Place } from './place.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap, throwError } from 'rxjs';
import { ErrorService } from '../shared/error.service';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private userPlaces = signal<Place[]>([]);
  private httpClient = inject(HttpClient);
  private errorService = inject(ErrorService);

  loadedUserPlaces = this.userPlaces.asReadonly();

  loadAvailablePlaces() {
    return this.fetchPlaces('http://localhost:3000/places');
  }

  loadUserPlaces() {
    return this.fetchPlaces('http://localhost:3000/user-places')
    .pipe(tap({
      next: (places) => {
        this.userPlaces.set(places);
      }
    }));
  }

  addPlaceToUserPlaces(place: Place) {
    //With below code we are updating the userplaces irrespective of whether we face any issue/error in below code (backend)
    // this.userPlaces.update((previousPlaces) => [...previousPlaces, place]);
    // return this.httpClient.put('http://localhost:3000/user-places', {
    //   placeId: place.id
    // })

    //To avoid optimistic updating (see above)
    const previousPlaces = this.userPlaces();

    if(!previousPlaces.some(p => p.id == place.id)) { //If we don't have same places then update the user places
      this.userPlaces.set([...previousPlaces, place]);
    }

    return this.httpClient.put('http://localhost:3000/user-places', {
      placeId: place.id,
    }).pipe(
      catchError(error => {
        this.errorService.showError('Error occurred while updating your favorite places');
        this.userPlaces.set(previousPlaces); //updating back to original user places if any error occurred in backend
        return throwError(() => new Error('Error occurred while updating your favorite places'));
      })
    )
  }

  removeUserPlace(place: Place) {
    const previousPlaces = this.userPlaces();

    if(previousPlaces.some(p => p.id == place.id)) {
      this.userPlaces.set(previousPlaces.filter(p => p.id !== place.id));
    }

    return this.httpClient.delete('http://localhost:3000/user-places/'+place.id)
    .pipe(
      catchError(error => {
        this.errorService.showError('Error occurred while deleteing your favorite place');
        this.userPlaces.set(previousPlaces);
        return throwError(() => new Error('Error occurred while deleteing your favorite place'));
      })
    )
  }

  fetchPlaces(url: string) {
    return this.httpClient.get<{places: Place[]}>(url).pipe(map((response) => response.places));
  }
}
