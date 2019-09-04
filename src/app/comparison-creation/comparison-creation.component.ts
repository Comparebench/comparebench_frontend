import { Component, OnInit } from '@angular/core';
import {IBenchmark} from "../interfaces/benchmark";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../user.service";
import {BenchmarkService} from "../benchmark.service";
import {Select2OptionData} from "ng2-select2";

@Component({
  selector: 'app-comparison-creation',
  templateUrl: './comparison-creation.component.html',
  styleUrls: ['./comparison-creation.component.css']
})
export class ComparisonCreationComponent implements OnInit {
    options = {
        placeholder: 'Choose Benchmark Profiles',
        multiple: true
    };
    benchmarks;

    constructor(private route: ActivatedRoute, private benchmarkService: BenchmarkService) {
    }

    ngOnInit() {
        this.benchmarkService.getBenchmarks().subscribe((response) => {
            this.benchmarks = [];
            for(let i=0;i<response['result'].length;i++){
                let benchmark = {
                    id: response['result'][i]['id'],
                    text:response['result'][i]['title']
                };
                this.benchmarks.push(benchmark)
            }
        })
    }


}
