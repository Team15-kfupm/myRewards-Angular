import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit(): void {

  }

  goTo(route: string){
    this._router.navigate([route]).then(r => console.log(r))
  }

  iAmInHome():boolean{

    return this._router.url == "/home";
  }

  iAmInOffers():boolean{

    return this._router.url == "/offers";
  }

}
