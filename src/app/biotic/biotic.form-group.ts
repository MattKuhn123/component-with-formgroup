import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";

export type Biotic = {
  fishNumber: number,
  fishLength: number,
}

export class BioticFormGroup extends FormGroup {
  get fishNumber(): FormControl { return super.get('fishNumber') as FormControl; }
  get fishLength(): FormControl { return super.get('fishLength') as FormControl; }
  get confirm(): FormControl { return super.get('confirm') as FormControl; }
  get error(): string | null {
    if (!this.invalid) {
      return null;
    }

    return Object.keys(this.errors!)[0];
  }

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

    this.validator = this.bioticValidator;
  }

  override getRawValue(): Biotic {
    return super.getRawValue() as Biotic;
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