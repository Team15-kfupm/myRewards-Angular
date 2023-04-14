import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Offer} from "../models/offer";

import {AuthService} from "../shared/services/auth.service";
import {OffersPathService} from "./offers-path.service";
import {lastValueFrom} from "rxjs";
import {OffersService} from "./offers.service";
import firebase from "firebase/compat/app";


@Injectable({
  providedIn: 'root'
})
export class DataAnalysisService {

  constructor(private firestore: AngularFirestore, private authService: AuthService,
              private offersPathService: OffersPathService,
              private offerService: OffersService,) {
  }


  // async addRedeemedOffer(offer: Offer, uid: string) {
  //   let store_id = await this.offerService.getUserUid()
  //   let date_birth = await this.getDateOfBirth(uid);
  //   let age = this.calculateAgeByDate(date_birth);
  //   let ages: number[] = [age]
  //   let path = await this.offersPathService.getOffersPath(store_id)
  //
  //   this.firestore.collection(path).doc(offer.id).update({
  //     ages: firebase.firestore.FieldValue.arrayUnion(age)
  //   }).then()
  // }


  calculateAgeByDate(date: string) {
    const birthDate = new Date(date);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  // async getDateOfBirth(uid: string): Promise<string> {
  //   let date = ''
  //   await lastValueFrom(this.firestore.collection('users').doc(uid).get()).then(res => {
  //     if (res.exists) {
  //       const data = res.data();
  //       date = data.birth_date.toString()
  //       return date
  //     } else
  //       return ''
  //   })
  //
  //   return date;
  // }


}
