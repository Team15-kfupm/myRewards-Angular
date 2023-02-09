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
  image: any = '';
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
    this.offerObj.startDate = this.startDate;
    this.offerObj.validityPeriod = this.validityPeriod;


    this.offersService.addOffer(this.offerObj, this.image).then(r => console.log(r));
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
    }).then(r => console.log(r))
    this.dialogRef.close()

  }


  onChange(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      console.log("FileUpload -> files", fileList);
      this.image = fileList[0];
    }
  }
}
