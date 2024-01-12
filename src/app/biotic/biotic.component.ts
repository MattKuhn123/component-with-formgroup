import { Component, WritableSignal, signal } from '@angular/core';
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

  protected postingStatus: WritableSignal<"Not Yet" | "In Progress" | "Error" | "Success"> = signal("Not Yet");
  protected postingMessage: WritableSignal<string> = signal("");

  constructor(private bioticService: BioticService) { }

  protected onClickSubmit(): void {
    if (this.bioticForm.invalid) {
      return;
    }

    const bioticFormValue: Biotic = this.bioticForm.getRawValue();
    this.postingStatus.set("In Progress");
    this.bioticService.post(bioticFormValue).subscribe({
      complete: () => {

      },
      next: x => {
        this.postingStatus.set("Success");
        this.postingMessage.set("Success!");
      },
      error: (err: HttpErrorResponse) => {
        this.postingStatus.set("Error");
        const postingMessage: string = 400 <= err.status && err.status <= 499
          ? err.error
          : "An error has occured!";
        
        this.postingMessage.set(postingMessage);
      }
    })
  }
}
