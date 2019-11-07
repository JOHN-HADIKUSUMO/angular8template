import { Component, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ILogin } from '../../models/Login';

@Component({
    selector: 'signin-modal',
    templateUrl: './signin.component.html'
})
export class SignInComponent implements OnInit {
    signinForm: FormGroup;
    closeResult: string;
    modal = null;
    @ViewChild('content', { static: true }) content: TemplateRef<any>;
    constructor(private modalService: NgbModal, private service: UserService, private formBuilder: FormBuilder) { }
    open() {
        this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title' });
    }

    get f() { return this.signinForm.controls; }

    onClear() {
        this.signinForm.reset();
    }

    onSubmit() {
        const obj: ILogin = {
            email: this.signinForm.controls['email'].value,
            password: this.signinForm.controls['password'].value
        };

        this.service.login(obj).subscribe(data => {
            this.service.sendMessage(data);
        }, error => {
            alert(error.error);
        });
        this.modalService.dismissAll();
    }

    ngOnInit(): void {
        this.signinForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        }, {});
    }
}
