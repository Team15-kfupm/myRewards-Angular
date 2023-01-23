import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {OfferFormComponent} from "../offer-form/offer-form.component";

@Component({
  selector: 'app-offers-page',
  templateUrl: './offers-page.component.html',
  styleUrls: ['./offers-page.component.scss']
})
export class OffersPageComponent implements OnInit {


  offers=[
    {title:"Offer1", description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, Magna aliqua",image:'https://i.ibb.co/w4828GK/coffee-cup-coffee-beans-sackcloth-high-quality-photo-1.png'},
    {title:"Offer1", description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, Magna aliqua",image:'https://i.ibb.co/w4828GK/coffee-cup-coffee-beans-sackcloth-high-quality-photo-1.png'},
    {title:"Offer1", description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, Magna aliqua",image:'https://i.ibb.co/w4828GK/coffee-cup-coffee-beans-sackcloth-high-quality-photo-1.png'},
    {title:"Offer1", description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, Magna aliqua",image:'https://i.ibb.co/w4828GK/coffee-cup-coffee-beans-sackcloth-high-quality-photo-1.png'},
  ]
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(){

    const dialogRef = this.dialog.open(OfferFormComponent);

  }
}
