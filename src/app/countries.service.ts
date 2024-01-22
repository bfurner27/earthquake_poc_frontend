import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, catchError, retry, throwError } from 'rxjs';

export interface TopEarthquakeCountry {
  name: string;
  count: number;
}

export interface TopEarthquakeCountriesResponse {
  data: Array<TopEarthquakeCountry>;
}

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  url: string = 'http://localhost:2401/countries';

  constructor(private http: HttpClient) { }

  // found this code at https://angular.io/guide/http-handle-request-errors
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  get_most_earthquakes(): Observable<TopEarthquakeCountriesResponse> {
    return this.http.get<TopEarthquakeCountriesResponse>(this.url + '/most-earthquakes').pipe(
      retry(3),
      catchError(this.handleError)
    );
  }
}
