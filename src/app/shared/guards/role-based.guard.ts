import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class RoleBasedGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkRole(route.data['roles'])
      .then(value => {
        if (!value)
          this.router.navigate(['redirect']).then();
        return value
      });
  }


  private async checkRole(roles: string[]): Promise<boolean> {
    const userRole = await this.getUserRole();
    return roles.includes(userRole);
  }

  private async getUserRole(): Promise<string> {
    return await this.authService.getCurrentUser()
      .then(user => {
        if (user === null) return '';
        return user.role;
      })
  }
}
