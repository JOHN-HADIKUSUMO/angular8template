import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { IUser } from '../models/User';
import { IRegistration } from '../models/Registration';
import { ILogin } from '../models/Login';
import { ILoginResponse } from '../models/LoginResponse';
import { IDeleteUser } from '../models/DeleteUser';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private userCount: Subject<number> = new Subject<number>();
    private subject = new Subject<ILoginResponse>();
    private baseUrl: string;
    private userLogin: ILoginResponse = null;

    constructor(private http: HttpClient) {
        this.baseUrl = environment.baseUrl;
    }

    initLogin() {
        this.userLogin = this.getLogin();
        if (this.userLogin != null) {
            if (this.userLogin.position == 'Manager') {
                this.getUsers().subscribe(s => {
                    this.sendUserCount(s.length);
                });
            }
        }
    }

    isLoggedIn(): boolean {
        return this.userLogin == null ? false : true;
    }

    isManager(): boolean {
        return this.userLogin == null ? false : (this.userLogin.position == 'Manager' ? true : false);
    }

    getLogin(): ILoginResponse {
        return JSON.parse(localStorage.getItem('login'));
    }

    setLoginOn(response: ILoginResponse) {
        if (!localStorage.getItem('login'))
            localStorage.removeItem('login');
        localStorage.setItem('login', JSON.stringify(response));
        this.initLogin();
    }

    setLoginOff() {
        if (localStorage.getItem('login')!=null) {
            localStorage.removeItem('login');
        }            
        this.userLogin = null;
    }

    sendUserCount(response: number) {
        this.userCount.next(response);
    }

    getUserCount(): Observable<number> {
        return this.userCount.asObservable();
    }

    sendMessage(response: ILoginResponse) {
        this.subject.next(response);
    }
    getMessage(): Observable<ILoginResponse> {
        return this.subject.asObservable();
    }

    login(login: ILogin): Observable<ILoginResponse> {
        var url = this.baseUrl + '/api/account/login';
        return this.http.post<ILoginResponse>(url, login);
    };

    delUser(deleteUser: IDeleteUser): Observable<boolean> {
        this.userLogin = this.getLogin();
        var url = this.baseUrl + '/api/account/users/delete';
        console.log(JSON.stringify(deleteUser));
        console.log(this.userLogin.token);
        console.log(url);

        return this.http.post<boolean>(url, deleteUser, { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.userLogin.token}` }) });
    };

    addUser(registration: IRegistration): Observable<boolean> {
        var url = this.baseUrl + '/api/account/users/add';
        return this.http.post<boolean>(url, registration);
    };

    updateProfile(profile:any): Observable<any> {
        this.userLogin = this.getLogin();
        var url = this.baseUrl + '/api/account/profile';
        return this.http.put<any>(url, profile, { headers: new HttpHeaders({ 'Authorization': `Bearer ${this.userLogin.token}` }) });
    }

    getProfile(): Observable<any> {
        this.userLogin = this.getLogin();
        var url = this.baseUrl + '/api/account/profile';
        return this.http.get<any>(url, { headers: new HttpHeaders({ 'Authorization': `Bearer ${this.userLogin.token}` }) });
    }

    getUsers(): Observable<IUser[]> {
        this.userLogin = this.getLogin();
        var url = this.baseUrl + '/api/account/users';
        return this.http.get<IUser[]>(url, { headers: new HttpHeaders({ 'Authorization': `Bearer ${this.userLogin.token}` }) });
    }
}
