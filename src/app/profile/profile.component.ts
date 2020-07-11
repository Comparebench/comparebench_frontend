import { Component, OnInit } from '@angular/core';

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
    constructor() {
    }

    ngOnInit(): void {
    }

}
