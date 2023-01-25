import { Injectable } from '@angular/core';
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {Observable} from "rxjs";
import {Offer} from "../models/offer";
import {AngularFirestore} from "@angular/fire/compat/firestore";

class FirestoreService {
}

@Injectable({
  providedIn: 'root'
})
export class OffersService {

  constructor( private firestore: AngularFirestore) { }

  /**@author Ali
   * @name getOffers
   * @description returns all offers from the firestore
   * **/
  getOffers(){
    return this.firestore.collection('/offers').snapshotChanges();
  }

  /**@author Ali
   * @name addOffer
   * @description  adds Offer object to offers collection in firestore
   * @return Promise<boolean>
   * **/
  async addOffer(offer:Offer, image:any):Promise<boolean>{
    if (image != null){
      offer.id = this.firestore.createId();
      await this.firestore.collection('/offers').add(offer);
      console.log('sent to the db !')

      return true;
    }else
      return false;
  }




}
