import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Offer} from "../../models/offer";
import {lastValueFrom} from "rxjs";
import {OffersService} from "../../services/offers.service";
import {OffersPathService} from "../../services/offers-path.service";
import firebase from "firebase/compat/app";
import Timestamp = firebase.firestore.Timestamp;
import FieldValue = firebase.firestore.FieldValue;


interface PromoCode {
  code: string;
  offer_id: string;
  uid: string,
}


interface Redeem {
  store_id: string,
  offer_id: string,
  customer_uid: string,
  date: Timestamp,
}

@Injectable({
  providedIn: 'root'
})
export class PromoCodeService {
  constructor(private firestore: AngularFirestore,
              private offersService: OffersService,
              private offersPathService: OffersPathService) {
  }


  async validateCode(code: string): Promise<string> {
    const ownerId = await this.offersService.getUserUid();
    let storeId = await this.offersPathService.getStoreId(ownerId);

    const querySnapshot = await this.firestore
      .collection('temp-claim').ref
      .where('code', '==', code)
      .where('store_id', '==', storeId)
      .limit(1).get();


    if (querySnapshot.docs.length == 0) throw Error('No code is found');
    let offerId = (querySnapshot.docs[0].data() as PromoCode)['offer_id'];

    return await lastValueFrom(
      this.firestore.doc(
        await this.offersPathService.getOfferPath(ownerId, offerId)
      ).get()
    ).then(value => {
      if (value.exists) {
        return (value.data() as Offer).title + " and the description " + (value.data() as Offer).description;
      } else
        return 'Not found'
    })
  }


  async redeemCode(code: string) {
    const ownerUid = await this.offersService.getUserUid();
    const storeId = await this.offersPathService.getStoreId(ownerUid);

    let claim_id = "";
    const querySnapshot = await this.firestore
      .collection('temp-claim').ref
      .where('code', '==', code)
      .where('store_id', '==', storeId)
      .limit(1).get();

    if (querySnapshot.docs.length == 0) throw Error('No code is found');
    const promoCode = (querySnapshot.docs[0].data() as PromoCode)
    const offerId = promoCode.offer_id;
    const customerUid = promoCode.uid;


    const redeem: Redeem = {
      store_id: storeId,
      offer_id: offerId,
      customer_uid: customerUid,
      date: Timestamp.now()
    }

    let offer: Offer = {
      id: '',
      description: '',
      start_date: '',
      end_date: '',
      title: '',
      image: '',
      worth_points: 0,
      num_of_redeem: 0,
    };


    // Adding new Redeem Object
    await this.firestore.collection('redeems').add(redeem)
      .then(res => console.log('Added ', res))
      .catch(err => console.error(err))


    await lastValueFrom(this.firestore.collection('stores').doc(storeId).collection('offers').doc(offerId).get()).then(value => {
      if (value.exists) {
        offer = (value.data() as Offer)
        offer.id = value.id
      }
    })


    await this.detectPoints(offer.worth_points, customerUid, storeId)

    await this.offersService.incrementChoice(offerId, ++offer.num_of_redeem).then(res => {
      console.log('Updated !', res)
    })


    this.firestore.firestore.collection('temp-claim').doc(claim_id).delete().then(e => console.log('Deleted !', e))

    return {offer, customerUid}

  }


  async detectPoints(points: number, costumerId: string, storeID: string) {
    points = points * -1;
    await this.firestore.collection('users').doc(costumerId).update({
      ["points." + storeID]: (FieldValue.increment(points))
    })

  }

}
