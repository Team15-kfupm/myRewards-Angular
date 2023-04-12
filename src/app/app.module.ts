import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";
import {CoreModule} from "./core/core.module";
import {MainModule} from "./main/main.module";
import {AuthenticationModule} from "./authentication/authentication.module";
import {CashierModule} from "./cashier/cashier.module";
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {environment} from "../environments/environment";
import {AngularFireModule} from "@angular/fire/compat";
import {USE_EMULATOR as USE_FIRESTORE_EMULATOR} from '@angular/fire/compat/firestore';
import {USE_EMULATOR as USE_STORAGE_EMULATOR} from '@angular/fire/compat/storage';
import {USE_EMULATOR as USE_AUTH_EMULATOR} from '@angular/fire/compat/auth';
import {USE_EMULATOR as USE_FUNCTIONS_EMULATOR} from '@angular/fire/compat/functions';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    MainModule,
    AuthenticationModule,
    CashierModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),

  ],
  providers: [
    {provide: USE_AUTH_EMULATOR, useValue: environment.useEmulators ? ['http://localhost:9099'] : undefined},
    {provide: USE_FIRESTORE_EMULATOR, useValue: environment.useEmulators ? ['localhost', 8080] : undefined},
    {provide: USE_FUNCTIONS_EMULATOR, useValue: environment.useEmulators ? ['localhost', 5001] : undefined},
    {provide: USE_STORAGE_EMULATOR, useValue: environment.useEmulators ? ['localhost', 9199] : undefined},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
