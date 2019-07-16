import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LandingComponent} from "./landing/landing.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ResultComponent} from "./result/result.component";

const routes: Routes = [
    {
        path: '',
        component: LandingComponent,
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        pathMatch: 'full'
    },
    {
        path: 'benchmark/:resultId',
        component: ResultComponent,
        pathMatch: 'full'
    },
    { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
