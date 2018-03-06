import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LandingComponent } from './landing/landing.component';
import { FeaturedComponent } from './landing/featured/featured.component';
import { LoginComponent } from './landing/login/login.component';
import { RegistrationComponent } from './landing/registration/registration.component';
import { ListingsComponent } from './listings/listings.component';
import { DisplayComponent } from './listings/display/display.component';
import { NewBikeComponent } from './listings/new-bike/new-bike.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: LandingComponent },
  { path: 'browse', component: DashboardComponent },
  { path: 'listings', component: ListingsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
