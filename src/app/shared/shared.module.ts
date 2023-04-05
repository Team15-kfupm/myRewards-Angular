import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RedeemPageComponent} from "./components/redeem-page/redeem-page.component";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [RedeemPageComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [RedeemPageComponent]
})
export class SharedModule {
}
