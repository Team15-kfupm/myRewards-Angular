import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {canActivate, redirectLoggedInTo, redirectUnauthorizedTo} from "@angular/fire/compat/auth-guard";
import {RoleGuard} from "./core/guards/role-guard.service";

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['auth']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['']);

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./main/main.module').then(m => m.MainModule),
    data: {roles: ['cashier']},
    canActivate: [RoleGuard],
  },
  {
    path: 'auth',
    loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule),
    ...canActivate(redirectLoggedInToHome)
  },
  {
    path: 'cashier',
    loadChildren: () => import('./cashier/cashier.module').then(m => m.CashierModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },

  {path: '**', redirectTo: '/', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
