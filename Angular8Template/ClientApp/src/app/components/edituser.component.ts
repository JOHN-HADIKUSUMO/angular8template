import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { ConfirmComponent } from '../components/modals/confirm.component';
import { IUser } from '../models/User';

@Component({
    selector: 'edit-user',
    templateUrl: './edituser.component.html'
})

export class EditUserComponent implements OnInit {
    public users: IUser[] = [];
    p: number = 1;
    constructor(private service: UserService, private route: ActivatedRoute) {

    }

    @ViewChild(ConfirmComponent, { static: true }) confirm: ConfirmComponent;

    refresh(): void {

    };

    ngOnInit(): void {
        this.refresh();
    }
}
