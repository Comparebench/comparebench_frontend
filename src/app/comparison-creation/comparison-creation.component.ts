import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BenchmarkService} from "../benchmark.service";

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
    title;
    description;
    benchmarks;

    constructor(private route: ActivatedRoute, private benchmarkService: BenchmarkService, private router: Router) {
    }
    create(){
        this.benchmarkService.createComparison(this.benchmarks, this.title, this.description).subscribe(response=>{
            this.router.navigate(['/compare', response["compare"]['compare_id']])
        })
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
