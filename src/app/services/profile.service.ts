import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {lastValueFrom} from "rxjs";
import {AuthService} from "../shared/services/auth.service";
import {Profile} from "../models/profile";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
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
}
