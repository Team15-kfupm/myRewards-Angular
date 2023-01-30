import { Injectable } from '@angular/core';
import {Offer} from "../models/offer";
import {AngularFirestore} from "@angular/fire/compat/firestore";


@Injectable({
  providedIn: 'root'
})
export class OffersService {

  constructor(private firestore: AngularFirestore) {
  }

  /**@author Ali Amin
   * @name getOffers
   * @description returns all offers from the firestore
   * **/
  getOffers() {
    return this.firestore.collection('/offers').snapshotChanges();
  }

  /**@author Ali Amin
   * @name addOffer
   * @description  adds Offer object to Offers collection in firestore
   * @return Promise<boolean>
   * **/
  async addOffer(offer: Offer, image: any): Promise<boolean> {
    if (image != null) {
      offer.id = this.firestore.createId();
      await this.firestore.collection('/offers').add(offer);
      console.log('sent to the db !')

      return true;
    } else
      return false;
  }


  /**@author Ali Amin
   * @name updateOffer
   * @description  is used to update the offer Object "Modify"
   * @return Promise<void>
   * **/
  async updateOffer(id:string, updates:any): Promise<void>{
    console.log("Updating "+id)
    await this.firestore.collection('offers').doc(id).update(updates);

  }

  /**@author Ali Amin
   * @name deleteOffer
   * @description  is used to update the offer Object "Modify"
   * @return Promise<void>
   * **/

  async deleteOffer(id:string):Promise<void>{
    console.log("Deleting..."+id);
    await this.firestore.collection('offers').doc(id).delete()
  }

}





