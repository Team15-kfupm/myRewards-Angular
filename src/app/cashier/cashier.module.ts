import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CashierComponent} from "./cashier.component";
import {CashierRoutingModule} from "./cashier-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    CashierComponent
  ],
  exports: [
    CashierComponent
  ],
  imports: [
    CommonModule,
    CashierRoutingModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    SharedModule]
})
export class CashierModule {
}
