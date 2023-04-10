import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-hamburger',
  templateUrl: './hamburger.component.html',
  styleUrls: ['./hamburger.component.scss']
})
export class HamburgerComponent implements OnInit {

  constructor(private _router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
  }


  goTo(route: string) {
    this._router.navigate([route]).then(r => console.log(r))
  }

  signOut() {
    this.authService.signOut();
    window.location.href = '/';
  }
}
