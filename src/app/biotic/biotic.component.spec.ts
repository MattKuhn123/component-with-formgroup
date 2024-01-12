import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BioticComponent } from './biotic.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BioticService } from './biotic.service';
import { signal } from '@angular/core';
import { BioticFormGroup, IBioticFormGroup } from './biotic.form-group';

describe('BioticComponent', () => {
  let component: BioticComponent;
  let fixture: ComponentFixture<BioticComponent>;

  let mockBioticService: Partial<BioticService> = {
    postingStatus: signal("Not Yet"),
    postingMessage: signal("")
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        BioticComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [
        { provide: BioticService, useValue: mockBioticService },
      ]
    });
    fixture = TestBed.createComponent(BioticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should enable the submit button when the form is valid', () => {
    const mock: IBioticFormGroup = {
      isInvalid: signal(false),
      invalid: false,

      fishLength: new FormControl(),
      confirm: new FormControl(),
      error: [],
      fishNumber: new FormControl(),
      getRawValue() { return { fishLength: 0, fishNumber: 0 }; },
      markAsPristine() { }
    };

    component.bioticForm = mock;
    fixture.detectChanges();

    const nativeElement: HTMLElement = fixture.nativeElement;
    const submitButton = nativeElement.querySelector("#submit");
    debugger;
    expect(submitButton?.attributes.getNamedItem("disabled")).toBeNull();
  })
  
  it('should disable the submit button when the form is invalid', () => {
    fixture.detectChanges();
    const nativeElement: HTMLElement = fixture.nativeElement;
    const submitButton = nativeElement.querySelector("#submit");
    expect(submitButton?.attributes.getNamedItem("disabled")).not.toBeNull();
  })
});
