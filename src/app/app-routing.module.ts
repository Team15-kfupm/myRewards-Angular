import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./components/main/main.component";
import {LoginPageComponent} from "./components/login-page/login-page.component";
import {RegPageComponent} from "./components/reg-page/reg-page.component";
import {OffersPageComponent} from "./components/offers-page/offers-page.component";

const routes: Routes = [
  {path:'home',component:MainComponent},
  {path:'login',component:LoginPageComponent},
  {path:'sign-up',component:RegPageComponent},
  {path:'offers',component:OffersPageComponent},
  {path:'**',component:MainComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
