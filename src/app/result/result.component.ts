import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {IResponse} from "../interfaces/response";
import {UserService} from "../user.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

    private benchmark = {gpu: []};
    private created_by_user = {};
    private resultId;

    // this.resultId = params

    constructor(private route: ActivatedRoute, private userService: UserService) {
    }

    ngOnInit() {
        console.log(this.resultId)
        let response;
        this.userService.getResult(this.route.snapshot.paramMap.get('resultId')).subscribe((response) => {
            this.benchmark = response['benchmark'];
            console.log(response)
        })
    }

}
