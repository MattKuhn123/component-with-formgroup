import { Component, effect } from '@angular/core';
import { BioticService, PostingStatus } from './biotic.service';
import { IBioticFormGroup } from './biotic.form-group';

@Component({
  selector: 'app-biotic',
  templateUrl: './biotic.component.html',
  styleUrls: ['./biotic.component.css']
})
export class BioticComponent {
  protected disableSubmit: boolean = true;
  protected showDotDotDot: boolean = false;
  protected showMessage: boolean = false;
  protected message: string = "";
  protected showError: boolean = false;

  constructor(private bioticService: BioticService, protected bioticForm: IBioticFormGroup) {
    // disableSubmit
    effect(() => {
      this.disableSubmit = this.bioticForm.isInvalid() || this.bioticService.postingStatus() === 'In Progress';
    });
    
    // showDotDotDot
    effect(() => {
      this.showDotDotDot = 'In Progress' === this.bioticService.postingStatus();
    });
    
    // showMessage
    effect(() => {
      const completeStatuses: PostingStatus[] = ['Recoverable Error', 'Unrecoverable Error', 'Success'];
      this.showMessage = completeStatuses.includes(this.bioticService.postingStatus());
    });
    
    // message
    effect(() => {
      this.message = this.bioticService.postingMessage();
    });

    // showError
    effect(() => {
      this.showError = this.bioticForm.isInvalid() && (this.bioticForm.touched || this.bioticForm.dirty)
    })
  }

  protected onClickSubmit(): void {
    this.bioticService.post(this.bioticForm.getRawValue()).subscribe(_ => {
      this.bioticForm.markAsPristine();
    });
  }
}
