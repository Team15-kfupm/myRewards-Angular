import {Injectable} from '@angular/core';
import {Offer} from "../models/offer";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {AuthService} from "../shared/services/auth.service";
import {OffersPathService} from "./offers-path.service";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class OffersService {
  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    private authService: AuthService,
    private offersPathService: OffersPathService) {
  }

  /**
   * @author Ali Amin
   * @name getOffers
   * @description returns all offers from the firestore
   * **/

  getOffers(): Observable<any> {
    return new Observable((observer) => {
      this.getUserUid().then(async (userUid) => {
        const collection = this.firestore
          .collection(await this.offersPathService.getOffersPath(await this.offersPathService.getStoreId(userUid)));
        const subscription = collection.snapshotChanges().subscribe(observer);
        return () => subscription.unsubscribe();
      }).catch((error) => {
        observer.error(error);
      });
    });
  }

  /**
   * @author Ali Amin
   * @name addOffer
   * @description  adds Offer object to Offers collection in firestore
   * @return Promise<boolean>
   * **/
  async addOffer(offer: Offer, image: File): Promise<boolean> {
    if (!image) {
      return false;
    }

    const uid = await this.getUserUid();
    const storeId = await this.offersPathService.getStoreId(uid);
    offer.id = this.firestore.createId();
    offer.uid = storeId;
    offer.image = await this.uploadImageAndGetUrl(offer.id, image);
    await this.firestore
      .collection(await this.offersPathService.getOffersPath(storeId))
      .add(offer);
    return true;
  }

  /**
   * @author Ali Amin
   * @name updateOffer
   * @description  is used to update the offer Object "Modify"
   * @return Promise<void>
   * **/
  async updateOffer(id: string, updates: any): Promise<void> {
    const uid = await this.getUserUid();

    await this.firestore
      .collection(await this.offersPathService.getOffersPath(uid)).doc(id)
      .update(updates);
  }

  /**
   * @author Ali Amin
   * @name deleteOffer
   * @description  is used to update the offer Object "Modify"
   * @return Promise<void>
   * **/

  async deleteOffer(id: string): Promise<void> {
    const uid = await this.getUserUid();
    await this.firestore
      .doc(await this.offersPathService.getOfferPath(uid, id))
      .delete();
  }

  async getUserUid(): Promise<string> {
    const user = await this.authService.getCurrentUser();
    const uid = user?.uid;
    if (!uid) {
      throw new Error('User not authenticated');
    }
    return uid;
  }

  async incrementChoice(id: string, num: number) {
    const uid = await this.getUserUid();
    await this.firestore
      .doc(await this.offersPathService.getOfferPath(uid, id))
      .update({num_of_redeem: num});
  }

  private async uploadImageAndGetUrl(id: string, image: File) {
    const storageRef = this.storage.ref(`offers/${id}`);
    const snapshot = await storageRef.put(image);
    return snapshot.ref.getDownloadURL();
  }


}





