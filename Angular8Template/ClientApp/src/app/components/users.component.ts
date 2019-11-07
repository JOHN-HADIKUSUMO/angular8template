import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Routes, RouterModule, RouteConfigLoadEnd, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { FullnamePipe } from '../pipes/fullname.pipe';
import { ConfirmComponent } from '../components/modals/confirm.component';
import { IUser } from '../models/User';
import { IDeleteUser } from '../models/DeleteUser';

@Component({
    selector: 'users',
    templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
    public users: IUser[] = [];
    private deleteUser: IDeleteUser;
    p: number = 1;
    constructor(private service: UserService,private route: Router) {

    }

    @ViewChild(ConfirmComponent, { static: true }) confirm: ConfirmComponent;

    onEdit(s: string): void {
        this.route.navigate(['users/edit',s]);
    };

    onDelete(s: string, i: string): void {
        this.confirm.open('Are you sure want to delete ' + s + ' ?').result.then((s) => {
            if (s) {
                this.deleteUser = { id: i };
                this.service.delUser(this.deleteUser).subscribe(s => {
                    this.refresh();
                });
            }
        });
    }

    refresh(): void {
        this.users = [];
        this.service.getUsers()
            .subscribe(data => {
                this.users = data;
                this.service.sendUserCount(this.users.length);
            });
    };

    ngOnInit(): void {
        this.refresh();
    }
}
