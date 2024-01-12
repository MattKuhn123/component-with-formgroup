import { Injectable, Signal, WritableSignal, signal } from '@angular/core';
import { Biotic } from './biotic.form-group';
import { Observable, delay, map, of } from 'rxjs';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { fake400, fake500 } from '../app.module';

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

  public post(biotic: Biotic): Observable<HttpResponse<unknown>> {
    this._postingStatus.set("In Progress");
    return of(new HttpResponse()).pipe(delay(2000)).pipe(map(x => {
      if (environment.throw400) {
        this._postingStatus.set("RecoverableError");
        this._postingMessage.set(fake400.error);
        throw fake400;
      }

      if (environment.throw500) {
        this._postingStatus.set("UnrecoverableError");
        this._postingMessage.set("An error has occured");
        throw fake500;
      }

      this._postingStatus.set("Success");
      this._postingMessage.set("Success!");
      return x;
    }));
  }
}