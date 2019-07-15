import {Component, OnInit} from '@angular/core';
import {UserService} from "./user.service";
import {IResponse} from "./interfaces/response";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'comparebench-frontend';
    private email;
    private password;

    constructor(private userService: UserService) {
    }

    login() {
        let response;
        this.userService.login(this.email, this.password)
            .subscribe(res => response = res.response as IResponse)
    }

    results() {
        let response;
        this.userService.results()
            .subscribe(res => response = res.response as IResponse)
    }

    ngOnInit() {

    }
}
