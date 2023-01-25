import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MainComponent } from './components/main/main.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { WcHeaderComponent } from './components/shared/wc-header/wc-header.component';
import { ChartCardComponent } from './components/shared/chart-card/chart-card.component';
import { ChartPieComponent } from './components/shared/chart-pie/chart-pie.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { RegPageComponent } from './components/reg-page/reg-page.component';
import { OffersPageComponent } from './components/offers-page/offers-page.component';
import { OfferFormComponent } from './components/offer-form/offer-form.component';
import { OfferCardComponent } from './components/offer-card/offer-card.component';
import { TextfieldComponent } from './components/shared/textfield/textfield.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';



@NgModule({
  declarations: [
    AppComponent,
     MainComponent,
     LoginPageComponent,
     SidenavComponent,
     WcHeaderComponent,
     ChartCardComponent,
     ChartPieComponent,
     RegPageComponent,
     OffersPageComponent,
     OfferFormComponent,
     OfferCardComponent,
     TextfieldComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())

  ],
  providers: [
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
