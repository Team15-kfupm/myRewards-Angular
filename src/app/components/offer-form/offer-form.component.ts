import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {OffersService} from "../../services/offers.service";
import {Offer} from "../../models/offer";

@Component({
  selector: 'app-offer-form',
  templateUrl: './offer-form.component.html',
  styleUrls: ['./offer-form.component.scss']
})
export class OfferFormComponent implements OnInit {

  edit = false;

  id = '';
  title = ''
  image = ''
  description = ''
  startDate = ''
  validityPeriod = 0

  offerObj: Offer = {
    id: '',
    title: '',
    description: '',
    image: '',
    startDate: '',
    validityPeriod: 0
  }

  constructor(private offersService: OffersService,
              private dialogRef: MatDialogRef<OfferFormComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {

    this.edit = this.data != null;
    if (this.edit) {
      this.id = this.data.id;
      this.title = this.data.title;
      this.image = this.data.image;
      this.description = this.data.description;
      this.startDate = this.data.startDate;
      this.validityPeriod = this.data.validityPeriod;
    }


  }


  resetAll() {
    this.id = '';
    this.title = '';
    this.image = '';
    this.description = '';
    this.startDate = '';
    this.validityPeriod = 0;
  }

  onSubmit() {
    if (this.title == '' || this.description == '' || this.startDate == '' || this.validityPeriod == 0) {
      alert('Fill all the fields')
      return
    }

    this.offerObj.id = this.id;
    this.offerObj.title = this.title;
    this.offerObj.description = this.description;
    this.offerObj.image = this.title + " Image";
    this.offerObj.startDate = this.startDate;
    this.offerObj.validityPeriod = this.validityPeriod;


    this.offersService.addOffer(this.offerObj, "Test");
    this.resetAll();
    this.dialogRef.close()
  }


  close() {
    this.resetAll();
    this.edit = false;
    this.dialogRef.close()

  }


  onSave() {

    this.offersService.updateOffer(this.id, {
      title: this.title,
      description: this.description,
      image: this.image,
      startDate: this.startDate,
      validityPeriod: this.validityPeriod
    })
    this.dialogRef.close()

  }


}
