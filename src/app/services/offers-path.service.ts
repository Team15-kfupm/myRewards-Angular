import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";

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
    if (!stores) {
      throw new Error('Store is not found');
    }
    return stores.docs[0].id;
  }

  public async getOffersPath(uid: string): Promise<string> {
    const storeId = await this.getStoreId(uid);
    return `${this.STORES_PATH}/${storeId}/offers`;
  }

  public async getOfferPath(uid: string, offerId: string): Promise<string> {
    const storeId = await this.getStoreId(uid);
    return `${await this.getOffersPath(storeId)}/${offerId}`;
  }

  public async getRedeemedOfferPath(uid: string, offerId: string): Promise<string> {
    const storeId = await this.getStoreId(uid);
    return `${await this.getOfferPath(storeId, offerId)}/redeems`;
  }
}
