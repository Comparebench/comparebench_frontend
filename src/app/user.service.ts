import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {IResponse} from "./interfaces/response";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

    constructor(private http:HttpClient) {}

    private _loginUrl: string = UserService.getHostname() + "/login";
    private _resultsUrl: string = UserService.getHostname() + "/yourresults";

    login(email, password): Observable<IResponse> {
        return this.http.post<IResponse>(this._loginUrl, {email: email, password: password}, {})
    }
    results(): Observable<IResponse> {
        return this.http.post<IResponse>(this._resultsUrl, {}, {})
    }

    static getHostname() {
        return 'http://localhost:8180'
    }
}

