import {Injectable} from '@angular/core';
import {Offer} from "../models/offer";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AngularFireStorage} from "@angular/fire/compat/storage";


@Injectable({
  providedIn: 'root'
})
export class OffersService {

  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage) {
  }

  /**
   * @author Ali Amin
   * @name getOffers
   * @description returns all offers from the firestore
   * **/
  getOffers() {
    return this.firestore.collection('/offers').snapshotChanges();
  }

  /**
   * @author Ali Amin
   * @name addOffer
   * @description  adds Offer object to Offers collection in firestore
   * @return Promise<boolean>
   * **/
  async addOffer(offer: Offer, image: any): Promise<boolean> {
    if (image != null) {

      offer.id = this.firestore.createId();
      let storageRef = this.storage.ref('offers/').child(offer.id);
      const snapshot = await storageRef.put(image);
      const url = await snapshot.ref.getDownloadURL();
      offer.image = url;
      await this.firestore.collection('/offers').add(offer).then(r => {
        console.log('sent to the db !')
      });
      return true;
    } else
      return false;
  }


  /**
   * @author Ali Amin
   * @name updateOffer
   * @description  is used to update the offer Object "Modify"
   * @return Promise<void>
   * **/
  async updateOffer(id: string, updates: any): Promise<void> {
    console.log("Updating " + id)
    await this.firestore.collection('offers').doc(id).update(updates);

  }

  /**
   * @author Ali Amin
   * @name deleteOffer
   * @description  is used to update the offer Object "Modify"
   * @return Promise<void>
   * **/

  async deleteOffer(id: string): Promise<void> {
    console.log("Deleting... " + id);

    //Deleting Image
    // const storage = getStorage();
    // let deleteRef = ref(storage, 'offers/' + id);
    // deleteObject(deleteRef).then(() => {
    //   console.log("Deleted image successfully " + id);
    // }).catch(err => {
    //   console.log('Error ' + err);
    // });

    await this.firestore.collection('offers').doc(id).delete()
  }

}





