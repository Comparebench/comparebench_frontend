import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../user.service";
import {IBenchmark} from "../interfaces/benchmark";
import {CompareBarService} from "../compare-bar.service";
import {BenchmarkService} from "../benchmark.service";

@Component({
  selector: 'app-result',
  templateUrl: './benchmark-profile.component.html',
  styleUrls: ['./benchmark-profile.component.css']
})
export class BenchmarkProfileComponent implements OnInit {

    benchmark: IBenchmark;

    created_by_user = {uid: 'any', display_name: ''};

    constructor(private route: ActivatedRoute, private benchmarkService: BenchmarkService, private compareBarService: CompareBarService) {
        this.benchmark = new IBenchmark({})
    }

    addToCompareBar(){
        this.compareBarService.addBenchmark(this.benchmark)
    }

    ngOnInit() {
        this.benchmarkService.getProfile(this.route.snapshot.paramMap.get('resultId')).subscribe((response) => {
            this.benchmark = new IBenchmark(response['profile'])
            this.created_by_user = response['created_by_user']
        })
    }

}
