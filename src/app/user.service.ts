import { Injectable } from '@angular/core';
import {Observable, of, Subject, Subscription} from "rxjs";
import {ILoginResponse, IResponse} from "./interfaces/response";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

    constructor(private http:HttpClient) {}

    _loginUrl: string = UserService.getHostname() + "/login";
    _resultsUrl: string = UserService.getHostname() + "/yourresults";
    _resultUrl: string = UserService.getHostname() + "/benchmark";
    _compareUrl: string = UserService.getHostname() + "/compare";
    _authUrl: string = UserService.getHostname() + "/authenticate";
    _logoutUrl: string = UserService.getHostname() + "/logout";
    public loggedIn = new Subject<boolean>();
    public user;

    login(email, password): Observable<ILoginResponse> {
        return this.http.post<ILoginResponse>(this._loginUrl, {email: email, password: password}, {})
    }
    results(): Observable<IResponse> {
        return this.http.post<IResponse>(this._resultsUrl, {}, {})
    }

    getResult(resultId): Observable<IResponse> {
        return this.http.post<IResponse>(this._resultUrl, {result_id: resultId}, {})
    }
    getComparison(compareId): Observable<IResponse> {
        return this.http.post<IResponse>(this._compareUrl, {compare_id: compareId}, {})
    }
    getAuth(): Observable<any> {
        return this.http.post<boolean>(this._authUrl, {}, {})
    }

    logout(): Observable<boolean> {
        return this.http.post<boolean>(this._logoutUrl, {}, {})
    }

    isLoggedIn(): Observable<boolean>{
        console.log("Checking auth: " + this.loggedIn);
        return this.loggedIn
    }

    static getHostname() {
        return 'https://comparebench.com/api'
    }
}

