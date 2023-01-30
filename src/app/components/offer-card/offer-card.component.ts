import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {OfferFormComponent} from "../offer-form/offer-form.component";
import {Offer} from "../../models/offer";

@Component({
  selector: 'app-offer-card',
  templateUrl: './offer-card.component.html',
  styleUrls: ['./offer-card.component.scss']
})
export class OfferCardComponent implements OnInit {

  @Input() offer:Offer = {
    id:'',
    description:'',
    startDate:'',
    validityPeriod:0,
    title:'',
    image:'',
  };
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onEdit(offer:Offer){
    //Sending the obj to the dialog
    this.dialog.open(OfferFormComponent,{
      data:offer,
    });
  }



}
