import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {lastValueFrom} from "rxjs";
import {AuthService} from "../shared/services/auth.service";
import {Profile} from "../models/profile";
import {OffersService} from "./offers.service";
import {OffersPathService} from "./offers-path.service";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService,
    private offerService: OffersService,
    private offersPathService: OffersPathService,
  ) {
  }

  async getProfile(): Promise<Profile> {
    const user = await this.authService.getCurrentUser()
      .then(user => user)
      .catch(err => console.log(err));

    return await lastValueFrom(
      this.firestore.collection('owners').doc(user!.uid).get()
    ).then((doc) => {
      console.log("ProfileService.getProfile() doc: ", doc.data());
      const profile = doc.data() as Profile;
      profile.email = user!.email;
      return profile;
    });
  }

  async updateProfile(data: Profile) {
    const user = await this.authService.getCurrentUser()
      .then(user => user)
      .catch(err => console.log(err));
    await this.firestore.collection('owners')
      .doc(user!.uid).update(data)
      .then(() => {
        console.log("Document successfully updated!");
      });
  }

  async getStoreName() {
    const ownerUid = await this.offerService.getUserUid();
    const storeId = await this.offersPathService.getStoreId(ownerUid);

    let name = '';


    await this.firestore.collection(`stores`).doc(storeId).get().forEach(doc => {
      // @ts-ignore
      name = doc.data().store_name
    })


    return name
  }
}
