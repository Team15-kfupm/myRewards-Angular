import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginPageComponent} from "./components/login-page/login-page.component";
import {RegPageComponent} from "./components/reg-page/reg-page.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthenticationComponent} from './authentication.component';
import {RouterOutlet} from "@angular/router";
import {AuthenticationRoutingModule} from "./authentication-routing.module";
import {CashierComponent} from './components/cashier/cashier.component';
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from '@angular/material/form-field';


@NgModule({
  declarations: [
    LoginPageComponent,
    RegPageComponent,
    AuthenticationComponent,
    CashierComponent,

  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterOutlet,
    MatInputModule,
    MatFormFieldModule
  ]
})
export class AuthenticationModule {
}
