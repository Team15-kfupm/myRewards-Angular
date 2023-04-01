import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CashierComponent} from "./cashier.component";
import {CashierRoutingModule} from "./cashier-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";



@NgModule({
  declarations: [
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
