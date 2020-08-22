import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {IBenchmark} from "./interfaces/benchmark";

@Injectable({
  providedIn: 'root'
})
export class CompareBarService {
    private _benchmarks: IBenchmark[] = new Array<IBenchmark>()
    private benchmarks = new Subject<IBenchmark[]>();
    constructor() {
    }
    getBenchmarks(): Observable<IBenchmark[]> {
        return this.benchmarks.asObservable();
    }
    addBenchmark(benchmark: IBenchmark) {
        this._benchmarks.push(benchmark)
        this.benchmarks.next(this._benchmarks);
    }
}
