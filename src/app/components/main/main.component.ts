import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

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

  constructor() {
  }

  ngOnInit(): void {
  }

}
