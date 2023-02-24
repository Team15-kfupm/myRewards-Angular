import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {OfferFormComponent} from "../offer-form/offer-form.component";
import {OffersService} from "../../../services/offers.service";
import {Offer} from "../../../models/offer";

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

  constructor(public dialog: MatDialog, private offersService: OffersService) {
  }


  ngOnInit(): void {
    this.getAllOffers()


  }

  getAllOffers() {
    this.offersService.getOffers().subscribe(res => {
      this.showSpinner = false;
      this.offers = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;

      })
    }, error => {
      console.log(error)
    });

  }

  openDialog() {
    this.dialog.open(OfferFormComponent, {
      data: null
    });
  }
}
