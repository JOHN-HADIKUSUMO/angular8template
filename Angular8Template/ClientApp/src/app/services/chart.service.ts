import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { IChartItem } from '../models/ChartItem';
import { ILoginResponse } from '../models/LoginResponse';
import { UserService } from './user.service';


@Injectable({
    providedIn: 'root'
})
export class ChartService {
    private baseUrl: string;
    private login: ILoginResponse;
    constructor(private http: HttpClient, private userService: UserService) {
        this.baseUrl = environment.baseUrl;
        this.login = userService.getLogin();
    }

    getASXData(): Observable<IChartItem[]> {
        var url = this.baseUrl + '/api/chart/asx/data';
        return this.http.get<IChartItem[]>(url, { headers: new HttpHeaders({ 'Authorization': `Bearer ${this.login.token}` }) });
    }

    getPMData(): Observable<IChartItem[]> {
        var url = this.baseUrl + '/api/chart/pm/data';
        return this.http.get<IChartItem[]>(url, { headers: new HttpHeaders({ 'Authorization': `Bearer ${this.login.token}` }) });
    }

    getCryptoData(): Observable<IChartItem[]> {
        var url = this.baseUrl + '/api/chart/crypto/data';
        return this.http.get<IChartItem[]>(url, { headers: new HttpHeaders({ 'Authorization': `Bearer ${this.login.token}` }) });
    }
}
