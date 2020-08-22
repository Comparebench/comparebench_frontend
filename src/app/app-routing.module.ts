import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LandingComponent} from "./landing/landing.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {BenchmarkProfileComponent} from "./benchmark-profile/benchmark-profile.component";
import {LoginComponent} from "./auth/login/login.component";
import {ComparisonComponent} from "./comparison/comparison.component";
import {BenchmarkCreationComponent} from "./benchmark-creation/benchmark-creation.component";
import {SignupComponent} from "./auth/signup/signup.component";
import {RoadmapComponent} from "./roadmap/roadmap.component";
import {ComparisonCreationComponent} from "./comparison-creation/comparison-creation.component";
import {ProfileComponent} from "./profile/profile.component";
import {ResultsComponent} from "./results/results.component";

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
        path: 'benchmark-creation/add',
        component: BenchmarkCreationComponent,
        pathMatch: 'full'
    },
    {
        path: 'benchmark/:resultId',
        component: BenchmarkProfileComponent,
        pathMatch: 'full'
    },
    {
        path: 'compare/add',
        component: ComparisonCreationComponent,
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
    {
        path: 'signup',
        component: SignupComponent,
        pathMatch: 'full'
    },
    {
        path: 'roadmap',
        component: RoadmapComponent,
        pathMatch: 'full'
    },
    {
        path: 'profile/:uid',
        component: ProfileComponent,
        pathMatch: 'full'
    },
    {
        path: 'profile',
        component: ProfileComponent,
        pathMatch: 'full'
    },
    {
        path: 'results',
        component: ResultsComponent,
        pathMatch: 'full'
    },
    //{ path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
