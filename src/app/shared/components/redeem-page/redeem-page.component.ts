import {Component, OnInit} from '@angular/core';
import {Offer} from "../../../models/offer";
import {PromoCodeService} from "../../services/promo-code.service";
import {MatDialog} from "@angular/material/dialog";
import {OffersService} from "../../../services/offers.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ConfirmationDialogComponent} from "../confirmation-dialog/confirmation-dialog.component";

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

  can_redeem: boolean = false

  constructor(private promoCodeService: PromoCodeService,
              public dialog: MatDialog, private offersService:
                OffersService, private snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
  }

  applyPromoCode(code: string) {
    this.can_redeem = false
    this.promoCodeService.validateCode(code).then((status) => {
      this.can_redeem = true
      this.planName = "The plan name is " + status
    }).catch(error => {
      console.error(error)
      this.planName = "That is not a valid code"
    });
    console.log(code);

  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Ok', {
      duration: 2000,
    });
  }

  redeem(code: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {data: 'Redeem'});

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.promoCodeService.redeemCode(code).then(r => {
            console.log('Redeemed successfully', r);
            this.openSnackBar('Deleted !');
            this.clearAll()
          }
        ).catch(err => {
          console.log('Error during delete ' + err);
          this.openSnackBar('Sorry Something Went wrong')
        });
      } else {
        dialogRef.close()
      }
    });
  }

  clearAll() {
    this.planName = '';
    this.promoCode = '';
    this.can_redeem = false;
  }

}
