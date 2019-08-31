import { Component, OnInit } from '@angular/core';
import {BenchmarkService} from "../benchmark.service";

@Component({
  selector: 'app-benchmark',
  templateUrl: './benchmark.component.html',
  styleUrls: ['./benchmark.component.css']
})
export class BenchmarkComponent implements OnInit {
    title;
    isPrivate = false;
    addedBenchmarks = [];
    supportedBenchmarks;
    currentBenchmarkType;

    constructor(private benchmarkService:BenchmarkService) {
    }
    addBenchmark(){
        this.addedBenchmarks.push({'benchmarkType': this.currentBenchmarkType});
        this.currentBenchmarkType = undefined
    }
    ngOnInit() {
        this.benchmarkService.getBenchmarkTypes().subscribe((response) => {
            this.supportedBenchmarks = response["benchmark_types"]
        })
    }

}
