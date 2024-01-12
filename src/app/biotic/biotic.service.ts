import { Injectable, Signal, WritableSignal, signal } from '@angular/core';
import { Biotic } from './biotic.form-group';
import { Observable, delay, map, of } from 'rxjs';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

export type PostingStatus = "Not Yet" | "In Progress" | "RecoverableError" | "UnrecoverableError" | "Success";

@Injectable({
  providedIn: 'root'
})
export class BioticService {

  constructor() { }

  protected _postingStatus: WritableSignal<PostingStatus> = signal("Not Yet");
  protected _postingMessage: WritableSignal<string> = signal("");

  public postingStatus: Signal<PostingStatus> = this._postingStatus.asReadonly();
  public postingMessage: Signal<string> = this._postingMessage.asReadonly();

  // This is a stubbed method that does not use a REAL HttpClient
  public post(biotic: Biotic): Observable<HttpResponse<unknown>> {
    this._postingStatus.set("In Progress");
    return of(new HttpResponse()).pipe(delay(2000)).pipe(map(x => {
      if (environment.throw400) {
        const error: HttpErrorResponse = new HttpErrorResponse({ error: "Readable error response from server. Display this on client.", status: 400 });
        this._postingStatus.set("RecoverableError");
        this._postingMessage.set(error.error);
        throw error;
      }

      if (environment.throw500) {
        const error: HttpErrorResponse = new HttpErrorResponse({ error: "UGLY UNREADABLE DATA! DO NOT DISPLAY", status: 500 });
        this._postingStatus.set("UnrecoverableError");
        this._postingMessage.set("An error has occured");
        throw error;
      }

      this._postingStatus.set("Success");
      this._postingMessage.set("Success!");
      return x;
    }));
  }
}