import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {IBenchmark} from "../interfaces/benchmark";
import {CompareBarService} from "../compare-bar.service";
import {CookieService} from "ngx-cookie-service";
import {BenchmarkService} from "../benchmark.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-compare-bar',
    templateUrl: './compare-bar.component.html',
    styleUrls: ['./compare-bar.component.css'],
    animations: [
        trigger('openClose', [
            // ...
            state('open', style({
                bottom: '0',
            })),
            state('closed', style({
                bottom: '-150px',
            })),
            transition('open => closed', [
                animate('.3s')
            ]),
            transition('closed => open', [
                animate('0.3s')
            ]),
        ]),
    ]
})
export class CompareBarComponent implements OnInit {
    isOpen = false;
    benchmarks: IBenchmark[] = []
    constructor(private router: Router, private compareBarService: CompareBarService, private BenchmarkService: BenchmarkService, private cookieService: CookieService) {
        try {
            let benchmarks = JSON.parse(atob(this.cookieService.get("compareBar")))
            for (let i = 0; i < benchmarks.length; i++) {
                this.compareBarService.addBenchmark(benchmarks[i])
            }
            this.benchmarks = benchmarks
        }catch (e){}
    }

    toggle() {
        this.isOpen = !this.isOpen;
    }
    remove(rid){
        for(let i=0;i<this.benchmarks.length;i++){
            if(this.benchmarks[i].rid == rid){
                this.benchmarks[i].compareBarHidden = true
            }
        }
    }
    clear(){
        this.compareBarService.clearAll()
    }
    createInstantComparison(){
        let benchmarkRequest = []
        for(let i=0;i<this.benchmarks.length;i++){
            benchmarkRequest.push(this.benchmarks[i].rid)
        }
        this.BenchmarkService.createInstantComparison(this.benchmarks).subscribe(response=>{
            this.router.navigate(['/compare', response["compare"]['compare_id']])
        })
    }
    ngOnInit(): void {

        this.compareBarService.getBenchmarks().subscribe(response=>{
            // for(let i=0;i<response.length;i++){
            //     if(response[i].compareBarHidden){
            //         continue
            //     }
            // }
            this.isOpen = true;
            this.benchmarks = response
        })
    }

}
