import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserService} from "./user.service";
import {Observable} from "rxjs";
import {ILoginResponse, IResponse} from "./interfaces/response";

@Injectable({
  providedIn: 'root'
})
export class BenchmarkService {

    constructor(private http: HttpClient) {}

    _benchmarkTypesUrl: string = UserService.getHostname() + "/benchmarks/types";
    _addBenchmarkUrl: string = UserService.getHostname() + "/benchmarks/add";
    _createComparisonUrl: string = UserService.getHostname() + "/benchmarks/add_comparison";
    _benchmarksUrl: string = UserService.getHostname() + "/benchmarks/results";

    getBenchmarkTypes(): Observable<ILoginResponse> {
        return this.http.post<ILoginResponse>(this._benchmarkTypesUrl, {}, {})
    }
    createComparison(benchmarks, title, desc): Observable<IResponse> {
        return this.http.post<IResponse>(this._createComparisonUrl, {benchmarks: benchmarks, title: title, desc: desc}, {})
    }
    addBenchmark(benchmark): Observable<IResponse> {
        return this.http.post<IResponse>(this._addBenchmarkUrl, benchmark, {})
    }
    getBenchmarks(): Observable<IResponse> {
        return this.http.post<IResponse>(this._benchmarksUrl, {}, {})
    }

}
