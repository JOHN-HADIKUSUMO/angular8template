import { AbstractControl } from '@angular/forms';
export function ageValidator(control: AbstractControl) {
  if (control.value != '') {
    if (isNaN(control.value)) {
      return { isNotNumeric: true };
    }
    if (control.value < 18)
      return { isUnderAge: true }
  }
  return;
}
