import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, catchError, retry, throwError } from 'rxjs';
import { Earthquake } from './earthquake'

interface Paging {
  page: number;
  pageSize: number;
  totalPages: number;
  totalRecords: number;
}

interface EarthquakeDataResponse {
  paging: Paging,
  data: Array<Earthquake>
}

@Injectable({
  providedIn: 'root'
})
export class EarthquakesService {
  private baseUrl: string = 'http://localhost:2401/earthquakes'
  private earthquakes: Array<Earthquake> = []
  private notifier: ReplaySubject<Array<Earthquake>> = new ReplaySubject(1)
  private currentPage: number = 1;

  constructor(private http: HttpClient) {
    this.load_more()
  }

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

  private load_data() {
    const url = this.baseUrl + `?page=${this.currentPage++}`
    console.error("DATA URL", url)
    this.http.get<EarthquakeDataResponse>(url).pipe(
      retry(3),
      catchError(this.handleError)
    ).subscribe((data) => {
      for (const e of data.data) {
        this.earthquakes[e.id] = e
      }

      this.update_notifier()
    })
  }

  subscribe(): ReplaySubject<Array<Earthquake>> {
    return this.notifier;
  }

  load_more() {
    this.load_data()
  }

  private update_notifier() {
    this.notifier.next(this.earthquakes.filter((e) => e !== undefined))
  }
}
