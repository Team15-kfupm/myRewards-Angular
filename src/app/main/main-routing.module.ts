import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from "./main.component";
import {OffersPageComponent} from "./components/offers-page/offers-page.component";
import {RedeemPageComponent} from "./components/redeem-page/redeem-page.component";
import {NewDashboardComponent} from "./components/new-dashboard/new-dashboard.component";
import {TailwindChartComponentPie} from "./components/tailwind-chart-pie/tailwind-chart.component-pie";


const routes: Routes = [{
  path: '', component: MainComponent,
  children: [
    {path: '', component: NewDashboardComponent},
    {path: 'offers', component: OffersPageComponent},
    {path: 'redeem', component: RedeemPageComponent},
    {path: 'new', component: NewDashboardComponent},
    {path: 'pie', component: TailwindChartComponentPie},
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
