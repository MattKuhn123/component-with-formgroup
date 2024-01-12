import { Injectable, Signal, WritableSignal, signal } from '@angular/core';
import { Biotic } from './biotic.form-group';
import { Observable, catchError, delay, map, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
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

  public post(biotic: Biotic): Observable<unknown> {
    this._postingStatus.set("In Progress");
    return of({}).pipe(delay(2000)).pipe(map(x => {
      this.simulateFakeErrors();
      this._postingStatus.set("Success");
      this._postingMessage.set("Success!");
      return x;
    })).pipe(catchError((err: HttpErrorResponse) => {
      if (400 <= err.status && err.status <= 499) {
        this._postingStatus.set("RecoverableError");
        this._postingMessage.set(err.error);
      }

      if (500 <= err.status ) {
        this._postingStatus.set("UnrecoverableError");
        this._postingMessage.set("An error has occured");
      }

      return of(null);
    }));
  }

  private simulateFakeErrors(): void {
    if (environment.throw400) {
      const fake400: HttpErrorResponse = new HttpErrorResponse({ error: "Readable error response from server. Display this on client.", status: 400 });
      throw fake400;
    }
    
    if (environment.throw500) {
      const fake500: HttpErrorResponse = new HttpErrorResponse({ error: "UGLY UNREADABLE DATA! DO NOT DISPLAY", status: 500 });
      throw fake500;
    }
  }
}