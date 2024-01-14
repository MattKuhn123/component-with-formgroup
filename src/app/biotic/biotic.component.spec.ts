import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BioticComponent } from './biotic.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BioticService, PostingStatus } from './biotic.service';
import { signal } from '@angular/core';
import { IBioticFormGroup } from './biotic.form-group';

describe('BioticComponent', () => {
  let component: BioticComponent;
  let fixture: ComponentFixture<BioticComponent>;

  const mockBioticService = (options: {
    postingStatus: PostingStatus,
    postingMessage: string
  }): Partial<BioticService> => {
    return {
      postingStatus: signal(options.postingStatus),
      postingMessage: signal(options.postingMessage)
    }
  }

  const mockBioticFormGroup = (options: {
    isInvalid: boolean,
    touched: boolean,
    dirty: boolean,
  }): IBioticFormGroup => {
    return {
      isInvalid: signal(options.isInvalid),
      touched: options.touched,
      dirty: options.dirty,
      fishLength: new FormControl(),
      confirm: new FormControl(),
      fishNumber: new FormControl(),
      error: [],
      getRawValue() { return { fishLength: 0, fishNumber: 0 }; },
      markAsPristine() { }
    }
  }

  const configureTest = (options: {
    service: Partial<BioticService>,
    formGroup: IBioticFormGroup
  }) => {
    TestBed.configureTestingModule({
      declarations: [
        BioticComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [
        { provide: BioticService, useValue: options.service },
        { provide: IBioticFormGroup, useValue: options.formGroup },
      ]
    });
    fixture = TestBed.createComponent(BioticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };

  it('should create', () => {
    configureTest({ 
      service: mockBioticService({ postingMessage: "", postingStatus: "Not Yet" }), 
      formGroup: mockBioticFormGroup({ dirty: false, isInvalid: false, touched: false }) 
    });

    expect(component).toBeTruthy();
  });
  
  it(`should enable submit when postingStatus === "Not Yet" formGroup.isInvalid === false`, () => {
    configureTest({
      service: mockBioticService({ postingMessage: "", postingStatus: "Not Yet" }),
      formGroup: mockBioticFormGroup({ dirty: false, isInvalid: false, touched: false })
    });

    fixture.detectChanges();
    const nativeElement: HTMLElement = fixture.nativeElement;
    const submitButton = nativeElement.querySelector("#submit");
    expect(submitButton?.attributes.getNamedItem("disabled")).toBeNull();
  });

  it(`should disable submit when postingStatus === "In Progress"`, () => {
    configureTest({
      service: mockBioticService({ postingMessage: "", postingStatus: "In Progress" }),
      formGroup: mockBioticFormGroup({ dirty: false, isInvalid: false, touched: false })
    });

    fixture.detectChanges();
    const nativeElement: HTMLElement = fixture.nativeElement;
    const submitButton = nativeElement.querySelector("#submit");
    expect(submitButton?.attributes.getNamedItem("disabled")).not.toBeNull();
  });

  it(`should disable submit when formGroup.isInvalid === true`, () => {
    configureTest({
      service: mockBioticService({ postingMessage: "", postingStatus: "Not Yet" }),
      formGroup: mockBioticFormGroup({ dirty: false, isInvalid: true, touched: false })
    });

    fixture.detectChanges();
    const nativeElement: HTMLElement = fixture.nativeElement;
    const submitButton = nativeElement.querySelector("#submit");
    expect(submitButton?.attributes.getNamedItem("disabled")).not.toBeNull();
  });

  it(`should not show dotdotdot when postingStatus !== "In Progress"`, () => {
    configureTest({
      service: mockBioticService({ postingMessage: "", postingStatus: "Not Yet" }),
      formGroup: mockBioticFormGroup({ dirty: false, isInvalid: true, touched: false })
    });

    fixture.detectChanges();
    const nativeElement: HTMLElement = fixture.nativeElement;
    const dotdotdot = nativeElement.querySelector("#dotdotdot");
    expect(dotdotdot).toBeNull();
  });

  it(`should show dotdotdot when postingStatus === "In Progress"`, () => {
    configureTest({
      service: mockBioticService({ postingMessage: "", postingStatus: "In Progress" }),
      formGroup: mockBioticFormGroup({ dirty: false, isInvalid: true, touched: false })
    });

    fixture.detectChanges();
    const nativeElement: HTMLElement = fixture.nativeElement;
    const dotdotdot = nativeElement.querySelector("#dotdotdot");
    expect(dotdotdot).not.toBeNull();
  });

  it(`should not show postingMessage when postingStatus not in ["RecoverableError", "UnrecoverableError", "Success"]`, () => {
    configureTest({
      service: mockBioticService({ postingMessage: "", postingStatus: "Not Yet" }),
      formGroup: mockBioticFormGroup({ dirty: false, isInvalid: true, touched: false })
    });

    fixture.detectChanges();
    const nativeElement: HTMLElement = fixture.nativeElement;
    const postingMessage = nativeElement.querySelector("#postingMessage");
    expect(postingMessage).toBeNull();
  });

  it(`should show postingMessage when postingStatus in ["RecoverableError", "UnrecoverableError", "Success"]`, () => {
    configureTest({
      service: mockBioticService({ postingMessage: "", postingStatus: "Success" }),
      formGroup: mockBioticFormGroup({ dirty: false, isInvalid: true, touched: false })
    });

    fixture.detectChanges();
    const nativeElement: HTMLElement = fixture.nativeElement;
    const postingMessage = nativeElement.querySelector("#postingMessage");
    expect(postingMessage).not.toBeNull();
  });

  it(`should not show errors when form is not invalid`, () => {
    configureTest({
      service: mockBioticService({ postingMessage: "", postingStatus: "Not Yet" }),
      formGroup: mockBioticFormGroup({ dirty: true, isInvalid: false, touched: true })
    });

    fixture.detectChanges();
    const nativeElement: HTMLElement = fixture.nativeElement;
    const errors = nativeElement.querySelector("#errors");
    expect(errors).toBeNull();
  });

  it(`should not show errors when form is invalid but also untouched`, () => {
    configureTest({
      service: mockBioticService({ postingMessage: "", postingStatus: "Not Yet" }),
      formGroup: mockBioticFormGroup({ dirty: false, isInvalid: true, touched: false })
    });

    fixture.detectChanges();
    const nativeElement: HTMLElement = fixture.nativeElement;
    const errors = nativeElement.querySelector("#errors");
    expect(errors).toBeNull();
  });

  it(`should show errors when form is invalid and touched`, () => {
    configureTest({
      service: mockBioticService({ postingMessage: "", postingStatus: "Not Yet" }),
      formGroup: mockBioticFormGroup({ dirty: true, isInvalid: true, touched: true })
    });

    fixture.detectChanges();
    const nativeElement: HTMLElement = fixture.nativeElement;
    const errors = nativeElement.querySelector("#errors");
    expect(errors).not.toBeNull();
  });
});
