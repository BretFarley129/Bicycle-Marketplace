import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { HttpService } from './http.service';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListingsComponent } from './listings/listings.component';
import { FeaturedComponent } from './landing/featured/featured.component';
import { LoginComponent } from './landing/login/login.component';
import { RegistrationComponent } from './landing/registration/registration.component';
import { NewBikeComponent } from './listings/new-bike/new-bike.component';
import { DisplayComponent } from './listings/display/display.component';


@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    DashboardComponent,
    ListingsComponent,
    FeaturedComponent,
    LoginComponent,
    RegistrationComponent,
    NewBikeComponent,
    DisplayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
