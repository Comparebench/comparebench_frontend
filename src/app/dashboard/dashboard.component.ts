import { Component, OnInit } from '@angular/core';
import {IResponse} from "../interfaces/response";
import {UserService} from "../user.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    constructor(private userService: UserService, private modalService: NgbModal) {}

    resultsCount;
    compareCount;
    results;
    comparisons;

    constructResults(resultData){
        this.results = resultData.bench_results;
        this.comparisons = resultData.comparisons;
        this.resultsCount = resultData.results_count;
        this.compareCount = resultData.compare_count;
    }

    deleteResult(resultId, template) {
        this.modalService.open(template, {ariaLabelledBy: 'modal-basic-title'}).result.then(() => {
            console.log("Deleted")
        }, () => {
            console.log("Dismissed")
        });
    }

    ngOnInit() {
        let response;
        this.userService.results().subscribe(res => response = res as IResponse,null, () => this.constructResults(response))
    }

}
