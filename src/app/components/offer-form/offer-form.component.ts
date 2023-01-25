import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MatDialogRef} from "@angular/material/dialog";
import {OffersService} from "../../services/offers.service";
import {Offer} from "../../models/offer";
import firebase from "firebase/compat";
import Timestamp = firebase.firestore.Timestamp;

@Component({
  selector: 'app-offer-form',
  templateUrl: './offer-form.component.html',
  styleUrls: ['./offer-form.component.scss']
})
export class OfferFormComponent implements OnInit {

  id='';
  title=''
  image=''
  description=''
  startDate=''
  validityPeriod=0
  offerObj:Offer ={
    id:'',
    title:'',
    description:'',
    image:'',
    startDate:'',
    validityPeriod:0
  }
  constructor(private offersService:OffersService,
             private dialogRef: MatDialogRef<OfferFormComponent>) { }

  ngOnInit(): void {
  }


  resetAll(){
    this.id='';
    this.title='';
    this.image='';
    this.description='';
    this.startDate='';
    this.validityPeriod=0;
  }

  onSubmit(){
    if (this.title == '' || this.description == '' || this.startDate == '' || this.validityPeriod == 0){
      alert('Fill all the fields')
      return
    }

    this.offerObj.id = this.id;
    this.offerObj.title = this.title;
    this.offerObj.description = this.description;
    this.offerObj.image = this.title+" Image";
    this.offerObj.startDate = this.startDate;
    this.offerObj.validityPeriod = this.validityPeriod;

    //clearAllFields
    this.resetAll()

    this.offersService.addOffer(this.offerObj, "Test");
    this.dialogRef.close()
  }







}
