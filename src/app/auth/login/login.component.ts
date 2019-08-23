import { Component, OnInit } from '@angular/core';
import {UserService} from "../../user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    email;
    password;

    constructor(private userService: UserService, private router: Router) {
    }

    login() {
        this.userService.login(this.email, this.password).subscribe((response) => {
            if (response.status === true) {

                this.userService.loggedIn.next(true);
                this.router.navigate(['/dashboard'])
            }
        })
    }

    ngOnInit() {
    }

}
