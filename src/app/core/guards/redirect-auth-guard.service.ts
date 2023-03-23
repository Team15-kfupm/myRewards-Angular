import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "../../shared/services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class RedirectAuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // it always returns true,
    return this.redirectToAuthMainPage(route).then(value => true);
  }

  async redirectToAuthMainPage(route: ActivatedRouteSnapshot): Promise<void> {
    const userRole = await this.getUserRole();
    if (userRole === 'bo') {
      this.router.navigate(['/']).then();
    } else if (userRole === 'cashier') {
      this.router.navigate(['cashier']).then();
    }
  }

  private async getUserRole(): Promise<string> {
    return await this.authService.getCurrentUser()
      .then(user => {
        if (user === null) return '';
        return user.role;
      });
  }

  private async checkRole(roles: string[]): Promise<boolean> {
    // const {roles} = route.data;
    // return await this.authService.getCurrentUser().then(user => {
    //   if (user === null) return false;
    //   const userRoles = user.roles;
    //   const hasPerm = roles.some((role: string) => userRoles.includes(role))
    //   return roles && hasPerm;
    // });
    const userRole = await this.getUserRole();
    return roles.includes(userRole);
  }

}
