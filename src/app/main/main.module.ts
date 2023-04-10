import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {SidenavComponent} from "./components/sidenav/sidenav.component";
import {WcHeaderComponent} from "../shared/components/wc-header/wc-header.component";
import {ChartCardComponent} from "../shared/components/chart-card/chart-card.component";
import {ChartPieComponent} from "../shared/components/chart-pie/chart-pie.component";
import {OffersPageComponent} from "./components/offers-page/offers-page.component";
import {OfferFormComponent} from "./components/offer-form/offer-form.component";
import {OfferCardComponent} from "./components/offer-card/offer-card.component";
import {TextfieldComponent} from "../shared/components/textfield/textfield.component";
import {ChartLineComponent} from "../shared/components/chart-line/chart-line.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MainComponent} from './main.component';
import {MainRoutingModule} from "./main-routing.module";
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {NewDashboardComponent} from './components/new-dashboard/new-dashboard.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {LayoutModule} from '@angular/cdk/layout';
import {TailwindChartComponentPie} from './components/charts/tailwind-chart-pie/tailwind-chart.component-pie';
import {LineChartTailwindComponent} from './components/charts/line-chart-tailwind/line-chart-tailwind.component';
import {DoughnutChartComponent} from './components/charts/doughnut-chart/doughnut-chart.component';
import {StatCardComponent} from './components/charts/stat-card/stat-card.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import {MatMenuModule} from "@angular/material/menu";
import {ProfileComponent} from './components/profile/profile.component';
import {ConfirmationDialogComponent} from './components/confirmation-dialog/confirmation-dialog.component';
import {SpinnerComponent} from '../shared/components/spinner/spinner.component';
import { HamburgerComponent } from './components/hamburger/hamburger.component';


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
    MainComponent,
    NewDashboardComponent,
    TailwindChartComponentPie,
    LineChartTailwindComponent,
    DoughnutChartComponent,
    StatCardComponent,
    ProfileComponent,
    ConfirmationDialogComponent,
    SpinnerComponent,
    HamburgerComponent,

  ],
  exports: [
    SidenavComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatExpansionModule,
    MatTableModule,
    MatGridListModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    LayoutModule,
    MatSnackBarModule,
    MatMenuModule,
    ReactiveFormsModule,

  ]
})
export class MainModule {
}
