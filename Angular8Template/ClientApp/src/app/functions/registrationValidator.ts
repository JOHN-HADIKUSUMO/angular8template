import { FormGroup } from '@angular/forms';
export function registrationValidator() {
  return (formGroup: FormGroup) => {
    const password = formGroup.controls['password'];
    const conpassword = formGroup.controls['conpassword'];
    if (conpassword.errors && !conpassword.errors.mustMatch) {
      return;
    }
    if (password.value !== conpassword.value) {
      conpassword.setErrors({ mustMatch: true });
    }    
  }
}
