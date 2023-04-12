import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {OfferFormComponent} from "../offer-form/offer-form.component";
import {OffersService} from "../../../../services/offers.service";
import {Offer} from "../../../../models/offer";
import firebase from "firebase/compat";
import Timestamp = firebase.firestore.Timestamp;

@Component({
  selector: 'app-offers-page',
  templateUrl: './offers-page.component.html',
  styleUrls: ['./offers-page.component.scss']
})
export class OffersPageComponent implements OnInit {

  showSpinner = true;
  offers: Offer[] = []
  title: string = '';
  description: string = '';
  image: string = '';

  no_Offers: boolean = false


  constructor(public dialog: MatDialog, private offersService: OffersService) {
  }

  ngOnInit(): void {
    this.getAllOffers()

  }

  getAllOffers() {
    this.offersService.getOffers().subscribe({
      next: (res) => {
        this.showSpinner = false;
        this.offers = res.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;


          //clean the date
          data.start_date = this.dateSanitizing(data.start_date)
          data.end_date = this.dateSanitizing(data.end_date)

          return data;
        });
        this.no_Offers = this.offers.length === 0;
      },
      error: (err) => {
        console.log(err);
      },
    });

  }

  openDialog() {
    this.dialog.open(OfferFormComponent, {
      data: null
    });
  }

  dateSanitizing(date:any) {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1; // Months are zero-indexed, so we add 1 to get the correct month number
    const day = dateObj.getDate();
    const formattedDate = `${day}/${month}/${year}`;

    return formattedDate

  }
}
