import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {OfferFormComponent} from "../offer-form/offer-form.component";
import {OffersService} from "../../services/offers.service";
import {AngularFirestore, DocumentChangeAction} from '@angular/fire/compat/firestore';
import {Observable} from "rxjs";
import {Offer} from "../../models/offer";

@Component({
  selector: 'app-offers-page',
  templateUrl: './offers-page.component.html',
  styleUrls: ['./offers-page.component.scss']
})
export class OffersPageComponent implements OnInit {


  // offers=[
  //   {title:"Offer1", description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, Magna aliqua",image:'https://i.ibb.co/w4828GK/coffee-cup-coffee-beans-sackcloth-high-quality-photo-1.png'},
  //   {title:"Offer1", description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, Magna aliqua",image:'https://i.ibb.co/w4828GK/coffee-cup-coffee-beans-sackcloth-high-quality-photo-1.png'},
  //   {title:"Offer1", description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, Magna aliqua",image:'https://i.ibb.co/w4828GK/coffee-cup-coffee-beans-sackcloth-high-quality-photo-1.png'},
  //   {title:"Offer1", description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, Magna aliqua",image:'https://i.ibb.co/w4828GK/coffee-cup-coffee-beans-sackcloth-high-quality-photo-1.png'},
  // ]

  loaded = false;

  offers : Offer[] =[]
  title:string = '';
  description:string = '';
  image:string = '';

  constructor(public dialog: MatDialog, private offersService:OffersService) {
  }


  ngOnInit(): void {
    this.getAllOffers()
  }

  getAllOffers(){
    this.offersService.getOffers().subscribe(res=>{
      this.offers = res.map((e:any) =>{
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;

      })
    }, error => {
      console.log(error)
    });
    this.loaded = true;
  }
  openDialog(){
    this.dialog.open(OfferFormComponent,{
      data:null
    });
  }
}
