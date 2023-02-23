import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from "../components/dashboard/dashboard.component";
import {SidenavComponent} from "../components/sidenav/sidenav.component";
import {WcHeaderComponent} from "../components/shared/wc-header/wc-header.component";
import {ChartCardComponent} from "../components/shared/chart-card/chart-card.component";
import {ChartPieComponent} from "../components/shared/chart-pie/chart-pie.component";
import {OffersPageComponent} from "../components/offers-page/offers-page.component";
import {OfferFormComponent} from "../components/offer-form/offer-form.component";
import {OfferCardComponent} from "../components/offer-card/offer-card.component";
import {TextfieldComponent} from "../components/shared/textfield/textfield.component";
import {ChartLineComponent} from "../components/shared/chart-line/chart-line.component";
import {FormsModule} from "@angular/forms";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";


@NgModule({
  declarations: [
    DashboardComponent,
    SidenavComponent,
    WcHeaderComponent,
    ChartCardComponent,
    ChartPieComponent,
    OffersPageComponent,
    OfferFormComponent,
    OfferCardComponent,
    TextfieldComponent,
    ChartLineComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatProgressSpinnerModule,
  ]
})
export class MainModule {
}
