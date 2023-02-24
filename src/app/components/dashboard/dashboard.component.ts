import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  charts = [
    {title: 'Total Customers', num: '1,500', type: 'plain', unit: 'customer', status: 'high'},
    {title: 'Redeemed Offers', num: '15', type: 'plain', unit: 'Offer', status: 'high'},
    {title: 'Total Shops', num: '3', type: 'plain', unit: 'shop', status: 'low'},
  ]


  pie_charts = [
    {title: 'Sales', type: 'pie', percentage: 60},
    {title: 'Customers', type: 'pie', percentage: 50},
  ]


  pie_charts2 = [
    {title: 'Weekly growth', type: 'line', percentage: 75},
    {title: 'Redeemed Offers in this week', type: 'line', percentage: 50},
  ]

  constructor(
    private auth: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.auth.user$.subscribe((user) => {
      console.log(user);
    });
  }


}
