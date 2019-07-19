import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UserService} from "./user.service";
import {IResponse} from "./interfaces/response";
import {Router} from "@angular/router";
import {NgbDropdown} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'comparebench-frontend';
    private email;
    private password;
    private user;
    private initLoading = true;
    constructor(private userService: UserService, private router: Router) {
            this.userService.authenticate()
    }

    ngOnInit() {


    }
}
