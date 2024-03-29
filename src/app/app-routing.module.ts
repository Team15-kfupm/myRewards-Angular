import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
  AngularFireAuthGuard,
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo
} from "@angular/fire/compat/auth-guard";
import {RedirectAuthGuard} from "./shared/guards/redirect-auth-guard.service";
import {RoleBasedGuard} from "./shared/guards/role-based.guard";
import {AdminPageComponent} from "./admin-page/admin-page.component";

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['auth']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['redirect']);


const routes: Routes = [
  {path: 'admin', component: AdminPageComponent},
  {
    path: 'auth',
    loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule),
    ...canActivate(redirectLoggedInToHome)
  },
  {
    path: 'redirect',
    children: [],
    data: {
      authGuardPipe: redirectUnauthorizedToLogin

    },
    canActivate: [AngularFireAuthGuard, RedirectAuthGuard],
  },
  {
    path: '',
    loadChildren: () => import('./main/main.module').then(m => m.MainModule),
    data: {
      roles: ['bo'],
      authGuardPipe: redirectUnauthorizedToLogin
    },
    canActivate: [AngularFireAuthGuard, RoleBasedGuard],
  },
  {
    path: 'cashier',
    loadChildren: () => import('./cashier/cashier.module').then(m => m.CashierModule),
    data: {
      roles: ['cashier'],
      authGuardPipe: redirectUnauthorizedToLogin
    },
    canActivate: [AngularFireAuthGuard, RoleBasedGuard],
  },

  {path: '**', redirectTo: '/', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
