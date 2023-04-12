import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Offer} from "../models/offer";

import {AuthService} from "../shared/services/auth.service";
import {OffersPathService} from "./offers-path.service";
import {User} from "../models/user";
import {lastValueFrom} from "rxjs";
import {OffersService} from "./offers.service";
import firebase from "firebase/compat/app";


@Injectable({
  providedIn: 'root'
})
export class DataAnalysisService {

  constructor(private firestore: AngularFirestore, private authService:AuthService,
              private offersPathService:OffersPathService,
              private offerService:OffersService,) { }






  async addRedeemedOffer(offer:Offer,uid:string){

    let store_id= await this.offerService.getUserUid()
    let date_birth = await this.getDateOfBirth(uid);
    let age = this.calculateAgeByDate(date_birth);



    this.firestore.collection('stores').doc(store_id).collection('offers').doc(offer.id).collection('redeems').add(
      {
        madeAt:Date().toLocaleUpperCase(),
        by:uid,
        age:age
      }
    ).then(r=>console.log(r))
  }












 calculateAgeByDate(date:string) {
    const birthDate = new Date(date);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  async getDateOfBirth(uid:string):Promise<string>{
    let date = ''
    await lastValueFrom(this.firestore.collection('users').doc(uid).get()).then(res=>{
      if (res.exists){
        const data = res.data();
        // @ts-ignore
        date = data?.birth_date.toString()
        // @ts-ignore
        return date
      }
      else
        return  ''
    })

    return date;
  }


}
