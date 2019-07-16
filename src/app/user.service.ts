import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {ILoginResponse, IResponse} from "./interfaces/response";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

    constructor(private http:HttpClient) {}

    private _loginUrl: string = UserService.getHostname() + "/login";
    private _resultsUrl: string = UserService.getHostname() + "/yourresults";
    private _resultUrl: string = UserService.getHostname() + "/benchmark";
    private _authUrl: string = UserService.getHostname() + "/authenticate";
    private _logoutUrl: string = UserService.getHostname() + "/logout";

    login(email, password): Observable<ILoginResponse> {
        return this.http.post<ILoginResponse>(this._loginUrl, {email: email, password: password}, {})
    }
    results(): Observable<IResponse> {
        return this.http.post<IResponse>(this._resultsUrl, {}, {})
    }

    getResult(resultId): Observable<IResponse> {
        return this.http.post<IResponse>(this._resultUrl, {result_id: resultId}, {})
    }
    authenticate(): Observable<IResponse> {
        return this.http.post<IResponse>(this._authUrl, {}, {})
    }
    logout(): Observable<boolean> {
        return this.http.post<boolean>(this._logoutUrl, {}, {})
    }

    static getHostname() {
        return 'http://localhost:8180'
    }
}

