import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {collection, getDocs, query, where} from "@angular/fire/firestore";
import {Offer} from "../../models/offer";
import {lastValueFrom} from "rxjs";
import {OffersService} from "../../services/offers.service";
import {OffersPathService} from "../../services/offers-path.service";


@Injectable({
  providedIn: 'root'
})
export class PromoCodeService {


  constructor(private firestore: AngularFirestore,
              private offersService: OffersService,
              private offerPathService: OffersPathService) {
  }


  async validateCode(code: string): Promise<string> {
    const storeId = await this.offersService.getUserUid();

    // let status: boolean = false;
    let info: string = "";
    console.log(storeId)

    const q = query(collection(this.firestore.firestore, '/temp-claim'), where('code', '==', code), where('store_id', '==', storeId))
    const querySnapshot = await getDocs(q);
    if (querySnapshot.docs.length == 0) throw Error('No code is found');
    let offer_id = querySnapshot.docs[0].data()['offer_id'];
    console.log('Here is ' + offer_id)

    return await lastValueFrom(this.firestore.collection('stores').doc(storeId).collection('offers').doc(offer_id).get()).then(value => {
      if (value.exists) {
        return (value.data() as Offer).title + " and the description " + (value.data() as Offer).description;
      } else
        return 'Not found'
    })
  }


  async redeemCode(code: string) {
    const storeId = await this.offersService.getUserUid();
    let claim_id = "";
    const q = query(collection(this.firestore.firestore, '/temp-claim'), where('code', '==', code), where('store_id', '==', storeId))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {

      claim_id = doc.id
    });
    let offer_id = querySnapshot.docs[0].data()['offer_id'];
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

    await lastValueFrom(this.firestore.collection('stores').doc(storeId).collection('offers').doc(offer_id).get()).then(value => {
      if (value.exists) {
        console.log(value.data())
        offer = (value.data() as Offer)
      }
    })

    await this.offersService.incrementChoice(offer_id, ++offer.num_of_redeem).then(res => {
      console.log('Updated !', res)
    })

    //this.firestore.firestore.collection('temp-claim').doc(claim_id).delete().then(e => console.log('Deleted !', e))

  }

}
