import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../shared/services/auth.service";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  constructor(
    private _router: Router,
    private authService: AuthService) {
  }

  ngOnInit(): void {

  }

  goTo(route: string) {
    this._router.navigate([route]).then(r => console.log(r))
  }

  iAmInHome(): boolean {

    return this._router.url == "/home";
  }

  iAmInOffers(): boolean {

    return this._router.url == "/offers";
  }

  iAmInRedeem(): boolean {

    return this._router.url == "/redeem";
  }

  iAmInLog(): boolean {

    return this._router.url == "/log";
  }

  signOut() {
    this.authService.signOut();
    window.location.href = '/';
  }
}
