import { Component, OnInit } from '@angular/core';
import {UserService} from "../../user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
    email;
    password;
    errorMessage;

    constructor(private userService: UserService, private router: Router) {
    }

    signup() {
        this.userService.signup(this.email, this.password).subscribe((response) => {
            if (response.status === true) {
                this.userService.loggedIn.next(true);
                this.router.navigate(['/dashboard'])
            }
            else{
                this.errorMessage = response.status
            }
        })
    }

    ngOnInit() {
    }

}
