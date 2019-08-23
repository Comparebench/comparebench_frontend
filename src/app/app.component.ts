import {Component, OnInit} from '@angular/core';
import {UserService} from "./user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    public initLoading = true;
    constructor(private userService: UserService) {

    }

    ngOnInit() {
        this.userService.getAuth().subscribe(response=>{
            this.userService.loggedIn.next(response);
            this.userService.user = true;
            this.initLoading = false
        })

    }


}
