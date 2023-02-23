import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";
import {CoreModule} from "./core/core.module";
import {MainModule} from "./main/main.module";
import {AuthenticationModule} from "./authentication/authentication.module";


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
    AuthenticationModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
