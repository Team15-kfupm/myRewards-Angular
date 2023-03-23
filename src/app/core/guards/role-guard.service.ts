import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "../../shared/services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private authService: AuthService,
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const result = this.isAuthorized(route);
    return result;
  }


  async isAuthorized(route: ActivatedRouteSnapshot): Promise<boolean> {
    const {roles} = route.data;
    return await this.authService.getCurrentUser().then(user => {
      if (user === null) return false;
      const userRoles = user.roles;
      const hasPerm = roles.every((role: string) => userRoles.includes(role))
      return !(roles && !hasPerm);
    });
  }

}
