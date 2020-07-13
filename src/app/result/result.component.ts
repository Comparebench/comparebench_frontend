import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../user.service";
import {IBenchmark} from "../interfaces/benchmark";

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

    benchmark: IBenchmark;

    created_by_user = {uid: 'any', display_name: ''};

    // this.resultId = params

    constructor(private route: ActivatedRoute, private userService: UserService) {
        this.benchmark = new IBenchmark({})
    }

    ngOnInit() {
        this.userService.getResult(this.route.snapshot.paramMap.get('resultId')).subscribe((response) => {
            this.benchmark = new IBenchmark(response['benchmark'])
            this.created_by_user = response['created_by_user']
        })
    }

}
