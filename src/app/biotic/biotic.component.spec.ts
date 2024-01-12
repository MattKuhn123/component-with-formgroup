import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BioticComponent } from './biotic.component';

describe('BioticComponent', () => {
  let component: BioticComponent;
  let fixture: ComponentFixture<BioticComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BioticComponent]
    });
    fixture = TestBed.createComponent(BioticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
