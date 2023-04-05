import {Component, OnInit} from '@angular/core';
import {Offer} from "../../../models/offer";
import {PromoCodeService} from "../../services/promo-code.service";

@Component({
  selector: 'redeem-page',
  templateUrl: './redeem-page.component.html',
  styleUrls: ['./redeem-page.component.scss']
})
export class RedeemPageComponent implements OnInit {
  showOfferDetails = false;
  offer?: Offer;
  promoCode: string = ''

  planName = "";

  constructor(private promoCodeService: PromoCodeService) {

  }

  ngOnInit(): void {
  }

  applyPromoCode(code : string) {
    this.promoCodeService.validateCode(code).then((status) => {
      console.log(status)

      this.planName = "The plan name is "+status
    });
    console.log(code);

  }

}
