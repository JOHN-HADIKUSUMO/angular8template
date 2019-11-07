import { Component, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { registrationValidator } from '../../functions/registrationValidator';
import { ageValidator } from '../../functions/ageValidator';
import { IRegistration } from '../../models/Registration';


@Component({
    selector: 'register-modal',
    templateUrl: './registration.component.html'
})
export class RegistrationComponent implements OnInit {
    registrationForm: FormGroup;
    closeResult: string;
    modalRef = null;
    message: string = null;
    positions: string[] = ['Manager','User'];
    @ViewChild('content', { static: true }) content: TemplateRef<any>;
    constructor(private modalService: NgbModal, private service: UserService, private formBuilder: FormBuilder) { }
    open() {
        this.modalRef = this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title' });
        return this.modalRef;
    }

    get f() { return this.registrationForm.controls; }
    get position() { return this.registrationForm.get('position'); }

    changePosition(e) {
        this.position.setValue(e.target.value, {
            onlySelf: true
        })
        if (e.target.value == '')
            this.position.setErrors({ required: true });
        else {
            this.position.setErrors(null);
            this.position.clearValidators();
            this.position.updateValueAndValidity();
        }
    }

    onClear() {
        this.registrationForm.reset();
        this.position.setValue('',{onlySelf: true})
    }

    onSubmit() {
        const obj: IRegistration = {
            email: this.registrationForm.controls['email'].value,
            password: this.registrationForm.controls['password'].value,
            firstname: this.registrationForm.controls['firstname'].value,
            lastname: this.registrationForm.controls['lastname'].value,
            position: this.registrationForm.controls['position'].value,
            age: this.registrationForm.controls['age'].value
        }

        this.modalRef.close(obj);
    }

    ngOnInit(): void {
        this.registrationForm = this.formBuilder.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            position: ['', [Validators.required]],
            age: ['', [Validators.required, ageValidator]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            conpassword: ['', Validators.required]
        }, { validator: registrationValidator() });
    }
}
