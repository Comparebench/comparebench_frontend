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
    @ViewChild('authDropdown') private authDropdown: NgbDropdown
    @ViewChild('loggedDropdown') private loggedDropdown: NgbDropdown
    constructor(private userService: UserService, private router: Router) {
    }

    login() {
        this.userService.login(this.email, this.password)
            .subscribe((response) => {
                console.log(response)
                if(response.status === true){
                    this.authDropdown.close();
                    this.user = true
                    this.router.navigate(['/dashboard'])
                }
            })
    }
    logout() {
        this.userService.logout().subscribe((response) => {
            this.loggedDropdown.close();
            this.user = response;
            this.router.navigate(['/'])
        })
    }

    ngOnInit() {
        this.userService.authenticate().subscribe((response) => {
            this.user = response
        })

    }
}
