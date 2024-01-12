import { Component, effect } from '@angular/core';
import { BioticService, PostingStatus } from './biotic.service';
import { BioticFormGroup } from './biotic.form-group';

@Component({
  selector: 'app-biotic',
  templateUrl: './biotic.component.html',
  styleUrls: ['./biotic.component.css']
})
export class BioticComponent {
  protected bioticForm: BioticFormGroup = new BioticFormGroup();
  protected disableSubmit: boolean = true;
  protected requestInProgess: boolean = false;
  protected requestComplete: boolean = false;
  protected message: string = "";

  constructor(private bioticService: BioticService) {
    // disableSubmit
    effect(() => {
      this.disableSubmit = this.bioticForm.isInvalid() || this.bioticService.postingStatus() === 'In Progress'
    });
    
    // requestInProgess
    effect(() => {
      this.requestInProgess = 'In Progress' === this.bioticService.postingStatus();
    });
    
    // requestComplete
    effect(() => {
      const completeStatuses: PostingStatus[] = ['RecoverableError', 'UnrecoverableError', 'Success'];
      this.requestComplete = completeStatuses.includes(this.bioticService.postingStatus());
    });
    
    // message
    effect(() => {
      this.message = this.bioticService.postingMessage();
    });
  }

  protected onClickSubmit(): void {
    this.bioticService.post(this.bioticForm.getRawValue()).subscribe(_ => {
      this.bioticForm.markAsPristine();
    });;
  }
}
