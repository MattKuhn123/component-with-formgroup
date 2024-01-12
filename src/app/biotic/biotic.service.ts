import { Injectable, Signal, WritableSignal, signal } from '@angular/core';
import { Biotic } from './biotic.form-group';
import { Observable, catchError, delay, of, tap } from 'rxjs';
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
    const fakeRequest: Observable<unknown> = of(null).pipe(delay(2000))
    .pipe(tap(x => this.simulateFakeErrors()))
    .pipe(tap(x => {
      this._postingStatus.set("Success");
      this._postingMessage.set("Success!");
    }))
    .pipe(catchError((err: HttpErrorResponse) => {
      const status: PostingStatus = 400 <= err.status && err.status <= 499
        ? "RecoverableError"
        : "UnrecoverableError";

      const message: string = 400 <= err.status && err.status <= 499
        ? err.error
        : "An error has occured";

      this._postingStatus.set(status);
      this._postingMessage.set(message);

      return of(null);
    }));

    return fakeRequest;
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