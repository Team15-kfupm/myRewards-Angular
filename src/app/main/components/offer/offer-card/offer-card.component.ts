import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {OfferFormComponent} from "../offer-form/offer-form.component";
import {Offer} from "../../../../models/offer";
import {OffersService} from "../../../../services/offers.service";
import {
  ConfirmationDialogComponent
} from "../../../../shared/components/confirmation-dialog/confirmation-dialog.component";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-offer-card',
  templateUrl: './offer-card.component.html',
  styleUrls: ['./offer-card.component.scss']
})
export class OfferCardComponent implements OnInit {

  @Input() offer: Offer = {
    id: '',
    description: '',
    start_date: '',
    end_date: '',
    title: '',
    image: '',
    worth_points: 0,
    num_of_redeem: 0,
  };


  code: string = "";

  constructor(public dialog: MatDialog, private offersService: OffersService, private snackBar: MatSnackBar,) {
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

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Ok', {
      duration: 2000,
    });
  }

  openConfirmationDialog(id: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {data: 'delete'});

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.offersService.deleteOffer(id).then(r => {
            console.log('Deleted successfully', r);
            this.openSnackBar('Deleted !');
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

}
