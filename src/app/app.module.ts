import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    DashboardComponent,
    BenchmarkComponent,
    ResultComponent
  ],
    imports: [
        BrowserModule,
        NgbModule,
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
    public user = true;
}
