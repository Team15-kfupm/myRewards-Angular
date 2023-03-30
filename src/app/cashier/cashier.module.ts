import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './components/auth/auth.component';
import {CashierComponent} from "./cashier.component";
import {CashierRoutingModule} from "./cashier-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";



@NgModule({
  declarations: [
    AuthComponent,
    CashierComponent
  ],
  imports: [
    CommonModule,
    CashierRoutingModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ]
})
export class CashierModule { }
