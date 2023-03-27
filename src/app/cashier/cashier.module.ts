import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './components/auth/auth.component';
import {CashierComponent} from "./cashier.component";
import {CashierRoutingModule} from "./cashier-routing.module";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    AuthComponent,
    CashierComponent
  ],
  imports: [
    CommonModule,
    CashierRoutingModule,
    ReactiveFormsModule,
  ]
})
export class CashierModule { }
