import { Component } from '@angular/core';
import { BioticService } from './biotic.service';
import { Biotic, BioticFormGroup } from './biotic.form-group';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-biotic',
  templateUrl: './biotic.component.html',
  styleUrls: ['./biotic.component.css']
})
export class BioticComponent {
  protected bioticForm: BioticFormGroup = new BioticFormGroup();
  constructor(protected bioticService: BioticService) { }

  protected onClickSubmit(): void {
    const bioticFormValue: Biotic = this.bioticForm.getRawValue();
    this.bioticService.post(bioticFormValue).subscribe({
      complete: () => { },
      next: x => {
        this.bioticForm.markAsPristine();
      },
      error: (err: HttpErrorResponse) => {
        this.bioticForm.markAsPristine();
      }
    })
  }
}
