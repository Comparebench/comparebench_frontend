import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {IBenchmark} from "../interfaces/benchmark";
import {CompareBarService} from "../compare-bar.service";

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
    constructor(private compareBarService: CompareBarService) {
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

    ngOnInit(): void {
        this.compareBarService.getBenchmarks().subscribe(response=>{
            // for(let i=0;i<response.length;i++){
            //     if(response[i].compareBarHidden){
            //         continue
            //     }
            // }
            this.benchmarks = response
        })
    }

}
