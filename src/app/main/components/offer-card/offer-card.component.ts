import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {OfferFormComponent} from "../offer-form/offer-form.component";
import {Offer} from "../../../models/offer";
import {OffersService} from "../../../services/offers.service";
import firebase from "firebase/compat";


@Component({
  selector: 'app-offer-card',
  templateUrl: './offer-card.component.html',
  styleUrls: ['./offer-card.component.scss']
})
export class OfferCardComponent implements OnInit {

  @Input() offer: Offer = {
    id: '',
    description: '',
    startDate: '',
    endDate: '',
    title: '',
    image: '',
  };


  code: string = "";

  constructor(public dialog: MatDialog, private offersService: OffersService) {
  }

  ngOnInit(): void {

    //this.offer.startDate = (this.offer.startDate as unknown as Timestamp).toDate().toISOString().split('T')[0];
    //this.offer.startDate = new firebase.firestore.Timestamp(this.offer.startDate);
    //this.offer.endDate = (this.offer.endDate as unknown as Timestamp).toDate().toISOString().split('T')[0];

  }

  onEdit(offer: Offer) {

    //Sending the obj to the dialog
    this.dialog.open(OfferFormComponent, {
      data: offer,
    });
  }

  deleteOffer(id: string): void {
    this.offersService.deleteOffer(id).then(r =>
      console.log('Deleted successfully')).catch(err => console.log('Error during delete ' + err));
  }


  parsingDate() {
    this.offer.startDate = this.offer.startDate.split('T')[0];
    this.offer.endDate = this.offer.endDate.split('T')[0];
  }
}
