import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {OfferFormComponent} from "../offer-form/offer-form.component";
import {OffersService} from "../../../../services/offers.service";
import {Offer} from "../../../../models/offer";

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
          data.startDate = this.dateSanitizing(data.startDate)
          data.endDate = this.dateSanitizing(data.endDate)

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

  dateSanitizing(date: string) {
    const cleanDate = new Date(date);
    let dateOnly = cleanDate.toISOString().substr(0, 10);
    return dateOnly

  }
}
