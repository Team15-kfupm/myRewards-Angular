import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {LoginPageComponent} from "./components/login-page/login-page.component";
import {RegPageComponent} from "./components/reg-page/reg-page.component";
import {OffersPageComponent} from "./components/offers-page/offers-page.component";
import {canActivate, redirectLoggedInTo, redirectUnauthorizedTo} from "@angular/fire/compat/auth-guard";


const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['sign-in']);
  const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  {path: 'home', component: DashboardComponent, ...canActivate(redirectUnauthorizedToLogin)},
  {path: 'sign-in', component: LoginPageComponent, ...canActivate(redirectLoggedInToHome)},
  {path: 'sign-up', component: RegPageComponent},
  {path: 'offers', component: OffersPageComponent, ...canActivate(redirectUnauthorizedToLogin)},
  {path: '**', redirectTo: '/home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
