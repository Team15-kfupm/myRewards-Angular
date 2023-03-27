import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {AngularFirestore,} from '@angular/fire/compat/firestore';
import {User} from "../../models/user";
import {first, lastValueFrom} from "rxjs";
import {AngularFireFunctions} from "@angular/fire/compat/functions";


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private fireAuth: AngularFireAuth,
    private fireStore: AngularFirestore,
    private fireFunctions: AngularFireFunctions,
  ) {

  }

  async signInWithCustomToken(token: string) {
    const result = await this.fireAuth.signInWithCustomToken(token);
    if (!result.user)
      throw new Error('User sign-in failed');
  }

  async signIn(email: string, password: string) {
    const result = await this.fireAuth.signInWithEmailAndPassword(email, password);
    if (!result.user)
      throw new Error('User sign-in failed');
  }

  async signUp(email: string, password: string) {
    // const result = await this.fireAuth.createUserWithEmailAndPassword(email, password);
    const result = await lastValueFrom(this.fireFunctions.httpsCallable('registerOwner')({email, password}));
    if (!result.success)
      throw new Error('Owner sign-up failed');
    return true;
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
        const user = snapshot.data() as User;
        user.uid = snapshot.id;
        return user;
      })
  }

}
