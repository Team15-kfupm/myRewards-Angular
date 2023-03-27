import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CashierComponent} from "./cashier.component";
import {AuthComponent} from "./components/auth/auth.component";


const routes: Routes = [{
  path: '',
  component: CashierComponent
},
  {
    path: 'auth',
    component: AuthComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CashierRoutingModule {
}
