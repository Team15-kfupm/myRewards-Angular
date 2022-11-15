import { Component, OnInit } from '@angular/core';
import {AppModule} from "../../app.module";
import {MatDialog} from "@angular/material/dialog";
import {NewOfferComponent} from "../new-offer/new-offer.component";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(public dialog:MatDialog) { }

  offers = [
    {id:1, title:"Offer demo", picture:"https://cdn-icons-png.flaticon.com/512/2331/2331980.png"},
    {id:2, title:"Offer demo", picture:"https://cdn-icons-png.flaticon.com/512/2331/2331980.png"},
    {id:3, title:"Offer demo", picture:"https://cdn-icons-png.flaticon.com/512/2331/2331980.png"},
    {id:4, title:"Offer demo", picture:"https://cdn-icons-png.flaticon.com/512/2331/2331980.png"},
    {id:4, title:"Offer demo", picture:"https://cdn-icons-png.flaticon.com/512/2331/2331980.png"},
  ]

  openDialog():void {
    this.dialog.open(NewOfferComponent);

  }
  ngOnInit(): void {
  }

}
