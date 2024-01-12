import { Injectable } from '@angular/core';
import { Biotic } from './biotic.form-group';
import { Observable, delay, map, of } from 'rxjs';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BioticService {

  constructor() { }

  // This is a stubbed method that does not use a REAL HttpClient
  public post(biotic: Biotic): Observable<HttpResponse<unknown>> {
    return of(new HttpResponse()).pipe(delay(2000)).pipe(map(x => {
      if (environment.throw400) {
        throw new HttpErrorResponse({ error: "Readable error response from server. Display this on client.", status: 400 });
      }

      if (environment.throw500) {
        throw new HttpErrorResponse({ error: "UGLY UNREADABLE DATA! DO NOT DISPLAY", status: 500 });
      }

      return x;
    }));
  }
}