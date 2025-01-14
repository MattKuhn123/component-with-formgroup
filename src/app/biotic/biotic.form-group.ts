import { Injectable, Signal, WritableSignal, signal } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";

export type Biotic = {
  fishNumber: number,
  fishLength: number,
}

@Injectable()
export abstract class IBioticFormGroup {
  abstract fishNumber: FormControl;
  abstract fishLength: FormControl;
  abstract confirm: FormControl;
  abstract error: string[];
  abstract isInvalid: Signal<boolean>;

  abstract getRawValue(): Biotic;
  abstract markAsPristine(): void;
  abstract touched: boolean;
  abstract dirty: boolean;
}

@Injectable()
export class BioticFormGroup extends FormGroup implements IBioticFormGroup {
  override getRawValue(): Biotic { return super.getRawValue() as Biotic; }
  get fishNumber(): FormControl { return super.get('fishNumber') as FormControl; }
  get fishLength(): FormControl { return super.get('fishLength') as FormControl; }
  get confirm(): FormControl { return super.get('confirm') as FormControl; }
  get error(): string[] {
    if (!this.invalid) {
      return [];
    }

    if (!this.errors) {
      return [];
    }

    return Object.keys(this.errors);
  }

  protected _isInvalid: WritableSignal<boolean> = signal(true);
  public isInvalid: Signal<boolean> = this._isInvalid.asReadonly();

  constructor() {    
    super({
      fishNumber: new FormControl(0, Validators.required),
      fishLength: new FormControl(0),
      confirm: new FormControl(false, Validators.requiredTrue),
    });

    this.fishNumber.valueChanges.subscribe(value => {
      if (value !== 1) {
        this.fishLength.disable();
      } else {
        this.fishLength.enable();
      }
    });

    this.valueChanges.subscribe(x => this._isInvalid.set(this.invalid));
    super.validator = this.bioticValidator;
  }

  private bioticValidator: ValidatorFn = (_: AbstractControl): ValidationErrors | null => {
    if (this.fishNumber.value !== 1 && this.fishLength.value) {
      return { "Fish length must be empty if fish number is not one!": true };
    }
    
    if (this.fishNumber.valid && this.fishLength.valid && !this.confirm.value) {
      return { "Please confirm your selections": true }
    }

    return null;
  };
}