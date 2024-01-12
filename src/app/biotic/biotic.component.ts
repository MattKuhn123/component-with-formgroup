import { Component } from '@angular/core';
import { BioticService } from './biotic.service';
import { Biotic, BioticFormGroup } from './biotic.form-group';

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
    this.bioticService.post(bioticFormValue).subscribe(_ => {
      this.bioticForm.markAsPristine();
    })
  }
}
