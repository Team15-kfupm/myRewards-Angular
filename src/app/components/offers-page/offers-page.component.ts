import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {OfferFormComponent} from "../offer-form/offer-form.component";

@Component({
  selector: 'app-offers-page',
  templateUrl: './offers-page.component.html',
  styleUrls: ['./offers-page.component.scss']
})
export class OffersPageComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(){

    const dialogRef = this.dialog.open(OfferFormComponent);

  }
}
