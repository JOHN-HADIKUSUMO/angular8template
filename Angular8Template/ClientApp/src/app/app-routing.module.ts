import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home.component'
import { UsersComponent } from './components/users.component'
import { EditUserComponent } from './components/edituser.component'
import { WishComponent } from './components/wish.component'
import { ASXComponent } from './components/asx.component'
import { PMComponent } from './components/pm.component'
import { ProfileComponent } from './components/profile.component'
import { CryptoComponent } from './components/crypto.component'
import { UserGuardService } from './services/userguard.service';
import { ManagerGuardService } from './services/managerguard.service';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'users', component: UsersComponent, canActivate: [ManagerGuardService] },
    { path: 'users/edit/:id', component: EditUserComponent, canActivate: [ManagerGuardService] },
    { path: 'wish-list', component: WishComponent, canActivate: [UserGuardService] },
    { path: 'statistic/asx', component: ASXComponent, canActivate: [UserGuardService] },
    { path: 'statistic/precious-metals', component: PMComponent, canActivate: [UserGuardService] },
    { path: 'statistic/cryptos', component: CryptoComponent, canActivate: [UserGuardService] },
    { path: 'profile', component: ProfileComponent, canActivate: [UserGuardService] }
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [UserGuardService, ManagerGuardService]
})
export class AppRoutingModule { }
export const routingComponents = [HomeComponent, UsersComponent, WishComponent, ASXComponent, PMComponent, CryptoComponent, ProfileComponent, EditUserComponent]
export const guardServices = [UserGuardService, ManagerGuardService];
