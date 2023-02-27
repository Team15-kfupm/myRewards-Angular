import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {OfferFormComponent} from "../offer-form/offer-form.component";
import {Offer} from "../../../models/offer";
import {OffersService} from "../../../services/offers.service";
import {PromoCodeService} from "../../../shared/services/promo-code.service";

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
    validityPeriod: 0,
    title: '',
    image: '',
  };


  status: string = "";

  code: string = "";

  constructor(public dialog: MatDialog, private offersService: OffersService, private codeService: PromoCodeService) {
  }

  ngOnInit(): void {
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


  async validateCode(code: string) {

    if (await this.codeService.validateCode(code)) {
      this.status = "The code is valid"
    } else
      this.status = "The code is not valid"

  }
}
