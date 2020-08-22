import { BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {TokenInterceptor} from "./token.interceptor";
import {CookieService} from "ngx-cookie-service";
import { DashboardComponent } from './dashboard/dashboard.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BenchmarkCreationComponent } from './benchmark-creation/benchmark-creation.component';
import { BenchmarkProfileComponent } from './benchmark-profile/benchmark-profile.component';
import { NavigationComponent } from './navigation/navigation.component';
import { LoginComponent } from './auth/login/login.component';
import { ComparisonComponent } from './comparison/comparison.component';
import {ArchwizardModule} from "angular-archwizard";
import {SignupComponent} from "./auth/signup/signup.component";
import { RoadmapComponent } from './roadmap/roadmap.component';
import { ComparisonCreationComponent } from './comparison-creation/comparison-creation.component';
import { ProfileComponent } from './profile/profile.component';
import { ResultsComponent } from './results/results.component';
import {NgSelect2Module} from "ng-select2";
import { CompareBarComponent } from './compare-bar/compare-bar.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    DashboardComponent,
    BenchmarkCreationComponent,
    BenchmarkProfileComponent,
    NavigationComponent,
    LoginComponent,
    ComparisonComponent,
    SignupComponent,
    RoadmapComponent,
    ComparisonCreationComponent,
    ProfileComponent,
    ResultsComponent,
    CompareBarComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        NgbModule,
        ArchwizardModule,
        NgSelect2Module,
        ChartsModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
    ],
  providers: [
      CookieService,
      {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

    constructor() {

    }
}


