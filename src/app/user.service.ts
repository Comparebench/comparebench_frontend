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
    _signUpUrl: string = UserService.getHostname() + "/signup";
    _resultsUrl: string = UserService.getHostname() + "/account/results";
    _profileUrl: string = UserService.getHostname() + "/account/profile";
    _resultUrl: string = UserService.getHostname() + "/benchmark";
    _compareUrl: string = UserService.getHostname() + "/benchmarks/get_comparison";
    _authUrl: string = UserService.getHostname() + "/authenticate";
    _logoutUrl: string = UserService.getHostname() + "/logout";
    public loggedIn = new Subject<boolean>();
    public user;

    login(email, password): Observable<ILoginResponse> {
        return this.http.post<ILoginResponse>(this._loginUrl, {email: email, password: password}, {})
    }
    signup(email, password): Observable<ILoginResponse> {
        return this.http.post<ILoginResponse>(this._signUpUrl, {email: email, password: password}, {})
    }
    results(): Observable<IResponse> {
        return this.http.post<IResponse>(this._resultsUrl, {}, {})
    }

    getResult(resultId): Observable<IResponse> {
        return this.http.post<IResponse>(this._resultUrl, {result_id: resultId}, {})
    }
    getProfile(uid?): Observable<IResponse> {
        return this.http.post<IResponse>(this._profileUrl, {uid: uid}, {})
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
        return this.loggedIn
    }

    static getHostname() {
        // return 'https://comparebench.com/api'
        return 'http://localhost:8180/api'
        // return "/api"
    }
}

