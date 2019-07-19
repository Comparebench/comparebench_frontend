import { BrowserModule } from '@angular/platform-browser';
import {NgModule, OnInit} from '@angular/core';
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
import { BenchmarkComponent } from './benchmark/benchmark.component';
import { ResultComponent } from './result/result.component';
import {UserService} from "./user.service";
import { NavigationComponent } from './navigation/navigation.component';
import { LoginComponent } from './auth/login/login.component';
import { ComparisonComponent } from './comparison/comparison.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    DashboardComponent,
    BenchmarkComponent,
    ResultComponent,
    NavigationComponent,
    LoginComponent,
    ComparisonComponent
  ],
    imports: [
        BrowserModule,
        NgbModule,
        ChartsModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule
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


