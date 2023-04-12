import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OffersPathService {

  private readonly STORES_PATH = 'stores';

  constructor() {
  }

  public getOffersPath(storeId: string): string {
    return `${this.STORES_PATH}/${storeId}/offers`;
  }
  public getOfferPath(storeId: string, offerId: string): string {
    return `${this.getOffersPath(storeId)}/${offerId}`;
  }

  public getRedeemedOfferPath(storeId: string, offerId: string): string {
    return `${this.getOffersPath(storeId)}/${offerId}/redeemedOffers`;
  }
}
