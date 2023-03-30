import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthenticationComponent} from "./authentication.component";
import {LoginPageComponent} from "./components/login-page/login-page.component";
import {RegPageComponent} from "./components/reg-page/reg-page.component";
import {CashierComponent} from "./components/cashier/cashier.component";

const routes: Routes = [
  // {path: '', redirectTo: 'sign-in', pathMatch: 'full'},
  {
    path: '', component: AuthenticationComponent,
    children: [
      {path: '', component: LoginPageComponent},
      {path: 'sign-up', component: RegPageComponent},
      {path: 'cashier', component: CashierComponent},
    ],
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule {
}
