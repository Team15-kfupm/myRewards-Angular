import {Component, OnInit} from '@angular/core';
import {Offer} from "../../../models/offer";
import {FormBuilder} from "@angular/forms";
import {PromoCodeService} from "../../../shared/services/promo-code.service";

@Component({
  selector: 'app-redeem-page',
  templateUrl: './redeem-page.component.html',
  styleUrls: ['./redeem-page.component.scss']
})
export class RedeemPageComponent implements OnInit {
  showOfferDetails = false;
  offer?: Offer;
  promoCode: string = ''

  planName = "";

  constructor(private promocodeService: PromoCodeService) {

  }

  ngOnInit(): void {
  }

  applyPromoCode(code : string) {
    this.promocodeService.validateCode(code).then((status) => {
      console.log(status)

      this.planName = "The plan name is "+status
    });
    console.log(code);

  }

}
