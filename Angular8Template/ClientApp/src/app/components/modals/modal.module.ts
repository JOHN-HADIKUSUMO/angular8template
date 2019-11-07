import { NgModule } from '@angular/core';
import { SignInComponent } from './signin.component'
import { RegistrationComponent } from './registration.component'
import { ConfirmComponent } from './confirm.component'
import { InfoComponent } from './info.component'
@NgModule({
})
export class ModalModule { }
export const modalComponents = [SignInComponent, RegistrationComponent, ConfirmComponent, InfoComponent]

