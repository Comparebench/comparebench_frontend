import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../user.service";
import {Router} from "@angular/router";
import {NgbDropdown} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
    private email;
    private password;
    private user;
    private loggedIn;
    @ViewChild('loggedDropdown', {static: true}) private loggedDropdown: NgbDropdown;

    constructor(private userService: UserService, private router: Router) {
    }

    login() {
        this.userService.login(this.email, this.password).subscribe((response) => {
            if (response.status === true) {
                this.user = true;
                this.loggedIn = true;
                this.router.navigate(['/dashboard'])
            }
        })
    }

    logout() {
        this.userService.logout().subscribe(() => {
            this.loggedDropdown.close();
            this.user = false;
            this.loggedIn = false;
            this.userService.loggedIn.next(false);
            this.router.navigate(['/'])
        })
    }

    ngOnInit() {
        this.userService.isLoggedIn().subscribe(response=>{
            this.user = response;
            this.loggedIn = response
        })
    }

}
