import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  charts = [
    {title: 'Total Customers', num: '1,500', type: '', unit: 'customer', status: 'high'},
    {title: 'Redeemed Offers', num: '15', type: '', unit: 'Offer', status: 'high'},
    {title: 'Total Shops', num: '3', type: '', unit: 'shop', status: 'low'},
  ]


  pie_charts = [
    {title: 'Sales', type: 'pie', percentage: 60},
    {title: 'Customers', type: 'pie', percentage: 50},
  ]


  pie_charts2 = [
    {title: 'Weekly growth', type: 'pie', percentage: 75},
    {title: 'Redeemed Offers in this week', type: 'pie', percentage: 50},
  ]

  constructor(
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
  }

  signOut() {
    this.authService.signOut();
    window.location.href = '/';
  }
}
