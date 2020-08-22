import {Injectable, OnInit} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {IBenchmark} from "./interfaces/benchmark";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class CompareBarService implements OnInit{
    private _benchmarks: IBenchmark[] = new Array<IBenchmark>()
    private benchmarks = new Subject<IBenchmark[]>();
    constructor(private cookieService: CookieService) {

    }
    ngOnInit(){

    }
    getBenchmarks(): Observable<IBenchmark[]> {
        return this.benchmarks.asObservable();
    }
    addBenchmark(benchmark: IBenchmark) {
        this._benchmarks.push(benchmark)
        this.benchmarks.next(this._benchmarks);
        this.cookieService.set("compareBar", btoa(JSON.stringify(this._benchmarks)), 1)
    }
}
