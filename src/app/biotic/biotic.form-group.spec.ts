import { BioticFormGroup } from './biotic.form-group';

describe('BioticFormGroup', () => {
  let formGroup: BioticFormGroup;

  beforeEach(() => {
    formGroup = new BioticFormGroup();
  });

  it('should enable fish length if fish number is 1', () => {
    formGroup.fishNumber.setValue(1);
    expect(formGroup.fishLength.enabled).toBeTrue();
  });

  it('should disable fish length if fish number is not 1', () => {
    formGroup.fishNumber.setValue(2);
    expect(formGroup.fishLength.enabled).toBeFalse();
  });

  it('should be invalid if confirm is not true', () => {
    formGroup.fishNumber.setValue(1);
    formGroup.fishLength.setValue(2);
    formGroup.confirm.setValue(false);
    expect(formGroup.invalid).toBeTrue();
  });

  it('should be invalid if fish length is populated if fish number is not 1', () => {
    formGroup.fishNumber.setValue(2);
    formGroup.fishLength.setValue(2);
    formGroup.confirm.setValue(true);
    expect(formGroup.invalid).toBeTrue();
  });
  
  it('should be valid if fish length is populated if fish number is 1', () => {
    formGroup.fishNumber.setValue(1);
    formGroup.fishLength.setValue(2);
    formGroup.confirm.setValue(true);
    expect(formGroup.invalid).toBeFalse();
  });
});
