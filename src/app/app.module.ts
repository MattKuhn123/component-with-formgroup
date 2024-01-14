import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BioticComponent } from './biotic/biotic.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BioticFormGroup, IBioticFormGroup } from './biotic/biotic.form-group';

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
  providers: [
    { provide: IBioticFormGroup, useClass: BioticFormGroup }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
