import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {environment} from "../../environments/environment";
import {getAuth, provideAuth} from "@angular/fire/auth";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {FIREBASE_OPTIONS} from "@angular/fire/compat";
import {AuthService} from "../shared/services/auth.service";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  providers: [
    {provide: FIREBASE_OPTIONS, useValue: environment.firebase},
    AuthService,
  ],
})
export class CoreModule {
}
