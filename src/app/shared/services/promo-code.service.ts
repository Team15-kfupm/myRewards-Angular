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

    const q = query(collection(this.firestore.firestore, '/temp-claim'), where('code', '==', code))
    const querySnapshot = await getDocs(q);
    if (querySnapshot.docs.length == 0) throw Error('Error');
    let offer_id = querySnapshot.docs[0].data()['offer_id'];
    console.log(offer_id)
    // this.firestore.collection('stores').doc(storeId).collection('offers').doc(offer_id).get().subscribe(res => {
    //
    //   info = (res.data() as Offer).title
    //   let offer = res.data() as Offer;
    // })

    this.firestore.collection('stores').doc(storeId).get().subscribe(e => {

      console.log(e.exists)
    });
    return await lastValueFrom(this.firestore.collection('stores').doc(storeId).collection('offers').doc(offer_id).get()).then(value => {
      if (value.exists) {
        return (value.data() as Offer).title + " and the description " + (value.data() as Offer).description;
      } else
        return 'Not found'
    })

    // querySnapshot.forEach((doc) => {
    //     status = doc.get('code') == code;
    //     if (status) {
    //       let offer_id = doc.get('offer_id');
    //       this.firestore.collection('offers').doc(offer_id).get().subscribe(res=>{
    //
    //         console.log((res.data() as Offer).title);
    //
    //       })
    //     }
    //     //console.log(doc.id, " => ", doc.data(), doc.get('code'));
    //   }
    // );

  }


}
