import { Component, ViewChild, TemplateRef, OnDestroy, OnInit } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SignInComponent } from '../modals/signin.component';
import { RegistrationComponent } from '../modals/registration.component';
import { InfoComponent } from '../modals/info.component';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'navigation',
    templateUrl: './nav.component.html'
})

export class NavComponent implements OnDestroy, OnInit {
    private loginSubscription: Subscription;
    private userCountSubscription: Subscription;
    private userCount: number = 0;
    constructor(private service: UserService, private router: Router) {
        this.userCountSubscription = this.service.getUserCount().subscribe(response => {
            if (response != null) {
                this.userCount = response;
            }
        }, error => { alert('error.....'); });

        this.loginSubscription = this.service.getMessage().subscribe(response => {
            if (response != null) {
                this.service.setLoginOn(response);
            }
            else {
                this.service.setLoginOff();
                this.router.navigate(['/']);
                return false;
            }
        });
    };

    @ViewChild(SignInComponent, { static: true }) signin: SignInComponent;
    @ViewChild(RegistrationComponent, { static: true }) register: RegistrationComponent;
    @ViewChild(InfoComponent, { static: true }) info: InfoComponent;
    isLoggedIn(): boolean {
        return this.service.isLoggedIn();
    }

    isManager(): boolean {
        return this.service.isManager();
    }

    registerClick() {
        this.register.open().result.then((res) => {
            if (res != null) {
                this.service.addUser(res).subscribe((res) => {
                    this.info.open('Your registration has been submitted.');
                },
                    (err) => {
                    }
                );
            }
        });
    }

    signoutClick() {
        this.service.sendMessage(null);
    }

    signinClick() {
        this.signin.open();
    }

    ngOnDestroy(): void {
        this.loginSubscription.unsubscribe();
        this.userCountSubscription.unsubscribe();
    }

    ngOnInit(): void {
        this.service.initLogin();
    }
}
