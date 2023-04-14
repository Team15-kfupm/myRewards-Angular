import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Offer} from "../models/offer";

import {AuthService} from "../shared/services/auth.service";
import {OffersPathService} from "./offers-path.service";
import {lastValueFrom} from "rxjs";
import {OffersService} from "./offers.service";
import firebase from "firebase/compat/app";


@Injectable({
  providedIn: 'root'
})
export class DataAnalysisService {

  constructor(private firestore: AngularFirestore, private authService: AuthService,
              private offersPathService: OffersPathService,
              private offerService: OffersService,) {
  }



  async getAgesForOffer(offer:Offer){
    const ownerUid = await this.offerService.getUserUid();
    const storeId = await this.offersPathService.getStoreId(ownerUid);
    let agesArray:number[]=[]
    const redeems = await this.firestore.collection(`analysis/${storeId}/redeems`).ref.where('offer_id','==',offer.id).get();
    if (redeems.docs.length == 0) console.log('no docs')
    redeems.forEach(doc=>{
      // @ts-ignore
      agesArray.push(doc.data().age)
    })

    return agesArray
  }
}
