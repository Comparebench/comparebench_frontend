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
    resultId;

    // this.resultId = params

    constructor(private route: ActivatedRoute, private userService: UserService) {
    }

    ngOnInit() {
        console.log(this.resultId);
        this.userService.getResult(this.route.snapshot.paramMap.get('resultId')).subscribe((response) => {
            this.benchmark = response['benchmark'].map(src => {
                return <IBenchmark> {
                    title: src.title,
                    uid: src.uid,
                    gpu: src.gpu,
                    mem_total: src.mem_total
                };
            });
            console.log(response)
        })
    }

}
