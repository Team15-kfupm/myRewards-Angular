import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {collection, getDocs, query, where} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class PromoCodeService {


  constructor(private firestore: AngularFirestore) {
  }


  async validateCode(code: string): Promise<boolean> {

    let status: boolean = false;

    const q = query(collection(this.firestore.firestore, '/temp-claim'), where('code', '==', code))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      status = doc.get('code') == code;
      if (status) {
        //Todo Remove the code from the collection
      }

      //console.log(doc.id, " => ", doc.data(), doc.get('code'));
    });


    return status;


  }


}
