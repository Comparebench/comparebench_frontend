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

    deleteResult(resultId, template) {
        this.modalService.open(template, {ariaLabelledBy: 'modal-basic-title'}).result.then(() => {
            console.log("Deleted")
        }, () => {
            console.log("Dismissed")
        });
    }

    ngOnInit() {
        this.userService.results().subscribe(response => {
            this.results = response.bench_results;
            this.comparisons = response.comparisons;
            this.resultsCount = response.results_count;
            this.compareCount = response.compare_count;
        })
    }

}
