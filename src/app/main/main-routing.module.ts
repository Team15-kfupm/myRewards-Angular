import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from "./main.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {OffersPageComponent} from "./components/offers-page/offers-page.component";


const routes: Routes = [{
  path: '', component: MainComponent,
  children: [
    {path: '', component: DashboardComponent},
    {path: 'offers', component: OffersPageComponent},

  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
