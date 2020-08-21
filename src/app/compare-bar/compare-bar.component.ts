import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
    selector: 'app-compare-bar',
    templateUrl: './compare-bar.component.html',
    styleUrls: ['./compare-bar.component.css'],
    animations: [
        trigger('openClose', [
            // ...
            state('open', style({
                bottom: '0',
            })),
            state('closed', style({
                bottom: '-150px',
            })),
            transition('open => closed', [
                animate('.3s')
            ]),
            transition('closed => open', [
                animate('0.3s')
            ]),
        ]),
    ]
})
export class CompareBarComponent implements OnInit {
    isOpen = false;
    constructor() {
    }

    toggle() {
        this.isOpen = !this.isOpen;
    }

    ngOnInit(): void {
    }

}
