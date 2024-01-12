import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BioticComponent } from './biotic/biotic.component';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export const fake400: HttpErrorResponse = new HttpErrorResponse({ error: "Readable error response from server. Display this on client.", status: 400 });
export const fake500: HttpErrorResponse = new HttpErrorResponse({ error: "UGLY UNREADABLE DATA! DO NOT DISPLAY", status: 500 });

@NgModule({
  declarations: [
    AppComponent,
    BioticComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
