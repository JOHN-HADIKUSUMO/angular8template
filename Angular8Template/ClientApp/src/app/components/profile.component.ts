import { Component, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ILoginResponse } from '../models/LoginResponse';
import { UserService } from '../services/user.service';
import { ageValidator } from '../functions/ageValidator';

@Component({
    selector: 'Profile',
    templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
    user: ILoginResponse;
    profileForm: FormGroup;
    positions: string[] = ['Manager', 'User'];
    constructor(private service: UserService, private formBuilder: FormBuilder) {
    }

    get f() { return this.profileForm.controls; }
    get position() { return this.profileForm.get('position'); }

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

    onSubmit(): void {
        var obj = {
            email: '',
            firstname: '',
            lastname: '',
            position: '',
            age: 0
        };

        this.service.updateProfile(obj).subscribe((res) => {

        });
    }

    ngOnInit(): void {
        this.profileForm = this.formBuilder.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            position: ['', [Validators.required]],
            age: [18, [Validators.required, ageValidator]]
        });

        this.service.getProfile().subscribe((res) => {
            console.log(JSON.stringify(res));
            this.profileForm.controls['firstname'].setValue(res.firstname);
            this.profileForm.controls['lastname'].setValue(res.lastname);
            this.profileForm.controls['position'].setValue(res.position);
            this.profileForm.controls['age'].setValue(res.age);
        });
    }
}
