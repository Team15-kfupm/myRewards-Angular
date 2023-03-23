import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {AngularFirestore,} from '@angular/fire/compat/firestore';
import {User} from "../../models/user";
import {first, lastValueFrom} from "rxjs";


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private fireAuth: AngularFireAuth,
    private fireStore: AngularFirestore,
  ) {

  }


  async signIn(email: string, password: string) {
    const result = await this.fireAuth.signInWithEmailAndPassword(email, password);
    if (!result.user)
      throw new Error('User sign-in failed');
  }

  async signUp(email: string, password: string /*, customProperty:string*/) {
    const result = await this.fireAuth.createUserWithEmailAndPassword(email, password);
    if (result.user) {
      const customUser: User = {
        uid: result.user.uid,
        email: result.user.email ?? '',
        role: 'bo',
      };
      return this.fireStore.collection('users').doc(result.user.uid).set(customUser);
    }
    throw new Error('User creation failed');
  }

  async signOut() {
    return this.fireAuth.signOut();
  }

  private getUser() {
    return this.fireAuth.authState.pipe(
      first()
    )
  }

  async getCurrentUser() {
    const user = await lastValueFrom(this.getUser()).then(value => {
        return value
      }
    );
    if (user === null) return null;
    return await lastValueFrom(this.fireStore
      .collection('users').doc(user?.uid).get())
      .then(snapshot => {
        return snapshot.data() as User;
      })
  }

}
