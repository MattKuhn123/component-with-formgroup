import { Component, OnInit, effect } from '@angular/core';
import { BioticService, completedStatuses } from './biotic.service';
import { BioticFormGroup } from './biotic.form-group';

@Component({
  selector: 'app-biotic',
  templateUrl: './biotic.component.html',
  styleUrls: ['./biotic.component.css']
})
export class BioticComponent implements OnInit {
  protected bioticForm: BioticFormGroup = new BioticFormGroup();
  protected disableSubmit: boolean = true;
  protected requestInProgess: boolean = false;
  protected requestComplete: boolean = false;
  protected message: string = "";

  constructor(private bioticService: BioticService) {
    effect(() => {
      this.updateDisableSubmit();
      this.requestInProgess = this.bioticService.postingStatus() === "In Progress";
      this.requestComplete = completedStatuses.includes(this.bioticService.postingStatus());
      this.message = this.bioticService.postingMessage();
    });
  }

  ngOnInit(): void {
    this.bioticForm.valueChanges.subscribe(_ => this.updateDisableSubmit());
  }

  private updateDisableSubmit(): void {
    this.disableSubmit = this.bioticForm.invalid || this.bioticService.postingStatus() === 'In Progress';
  }

  protected onClickSubmit(): void {
    this.bioticService.post(this.bioticForm.getRawValue()).subscribe(_ => this.bioticForm.markAsPristine());
  }
}
