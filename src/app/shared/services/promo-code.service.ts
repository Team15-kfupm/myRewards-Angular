import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {collection, getDocs, query, where} from "@angular/fire/firestore";
import {Offer} from "../../models/offer";
import {lastValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PromoCodeService {


  constructor(private firestore: AngularFirestore) {
  }


  async validateCode(code: string): Promise<string> {

    let status: boolean = false;
    let info: string = "";

    const q = query(collection(this.firestore.firestore, '/temp-claim'), where('code', '==', code))
    const querySnapshot = await getDocs(q);
    if (querySnapshot.docs.length == 0) throw Error('Error');
    let offer_id = querySnapshot.docs[0].data()['offer_id'];
    this.firestore.collection('offers').doc(offer_id).get().subscribe(res => {
      info = (res.data() as Offer).title
    })

    return await lastValueFrom(this.firestore.collection('offers')
      .doc(offer_id).get()).then(value => {
      return (value.data() as Offer).title + " and the description "+ (value.data() as Offer).description;
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
