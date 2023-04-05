import {Component, OnInit} from '@angular/core';
import {AuthService} from "../shared/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cashier',
  templateUrl: './cashier.component.html',
  styleUrls: ['./cashier.component.scss']
})
export class CashierComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  async logout() {
    await this.authService.signOut()
      .then(() => {
        console.log("User signed out");
        this.router.navigate(['/redirect'])
      })
    ;
  }
}
