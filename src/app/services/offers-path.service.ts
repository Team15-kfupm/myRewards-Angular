import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Store} from "../models/store";

@Injectable({
  providedIn: 'root'
})
export class OffersPathService {

  private readonly STORES_PATH = 'stores';

  constructor(
    private firestore: AngularFirestore,
  ) {
  }

  public async getStoreId(uid: string): Promise<string> {

    const stores = await this.firestore
      .collection('stores').ref
      .where('owner_uid', '==', uid)
      .limit(1)
      .get();

    return (stores.docs[0] as unknown as Store).id;
  }

  public async getOffersPath(uid: string): Promise<string> {
    return `${this.STORES_PATH}/${uid}/offers`;
  }

  public async getOfferPath(uid: string, offerId: string): Promise<string> {
    console.log(uid)
    const storeId = await this.getStoreId(uid);
    return `${await this.getOffersPath(storeId)}/${offerId}`;
  }

  public async getRedeemedOfferPath(uid: string, offerId: string): Promise<string> {
    const storeId = await this.getStoreId(uid);
    return `${await this.getOfferPath(storeId, offerId)}/redeems`;
  }
}
