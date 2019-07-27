import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LandingComponent} from "./landing/landing.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ResultComponent} from "./result/result.component";
import {LoginComponent} from "./auth/login/login.component";
import {ComparisonComponent} from "./comparison/comparison.component";
import {BenchmarkComponent} from "./benchmark/benchmark.component";

const routes: Routes = [
    {
        path: '',
        component: LandingComponent,
        // resolve: {
        //       user: AppResolverService
        //     },
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        // canActivate: [AuthGuardService],

        pathMatch: 'full'
    },
    {
        path: 'benchmark/add',
        component: BenchmarkComponent,
        pathMatch: 'full'
    },
    {
        path: 'benchmark/:resultId',
        component: ResultComponent,
        pathMatch: 'full'
    },
    {
        path: 'compare/:compareId',
        component: ComparisonComponent,
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent,
        pathMatch: 'full'
    },
    { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
