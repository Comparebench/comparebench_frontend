import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    is_logged_in_user = false
    user = {name: '', username: '', display_name: ''}
    benchmark_count = 0
    compare_count = 0
    constructor(private UserService: UserService) {
    }

    ngOnInit(): void {
        this.UserService.getProfile().subscribe(response=>{
            this.user = response['user']
        })
    }

}
