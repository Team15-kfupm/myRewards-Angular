import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from "./main.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {OffersPageComponent} from "./components/offers-page/offers-page.component";
import {RedeemPageComponent} from "./components/redeem-page/redeem-page.component";
import {LogTableComponent} from "./components/log-table/log-table.component";
import {ProfileComponent} from "./components/profile/profile.component";


const routes: Routes = [{
  path: '', component: MainComponent,
  children: [
    {path: '', component: DashboardComponent},
    {path: 'offers', component: OffersPageComponent},
    {path: 'profile', component: ProfileComponent},

    {path: 'redeem', component: RedeemPageComponent},
    {path: 'log', component: LogTableComponent},
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
