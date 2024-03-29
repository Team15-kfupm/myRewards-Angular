import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from "./main.component";
import {OffersPageComponent} from "./components/offer/offers-page/offers-page.component";
import {RedeemPageComponent} from "../shared/components/redeem-page/redeem-page.component";

import {NewDashboardComponent} from "./components/new-dashboard/new-dashboard.component";


import {ProfileComponent} from "./components/profile/profile.component";
import {ProfileResolver} from "./components/profile/profile.resolver";


const routes: Routes = [{
  path: '', component: MainComponent,
  children: [
    {path: '', component: NewDashboardComponent},
    {path: 'offers', component: OffersPageComponent},
    {
      path: 'profile', component: ProfileComponent,
      resolve: {profile: ProfileResolver}
    },
    {path: 'redeem', component: RedeemPageComponent},
    {path: 'new', component: NewDashboardComponent},

  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
