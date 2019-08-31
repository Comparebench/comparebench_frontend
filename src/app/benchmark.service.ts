import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserService} from "./user.service";
import {Observable} from "rxjs";
import {ILoginResponse} from "./interfaces/response";

@Injectable({
  providedIn: 'root'
})
export class BenchmarkService {

    constructor(private http: HttpClient) {}

    _benchmarkTypesUrl: string = UserService.getHostname() + "/benchmarks/types";

    getBenchmarkTypes(): Observable<ILoginResponse> {
        return this.http.post<ILoginResponse>(this._benchmarkTypesUrl, {}, {})
    }

}
