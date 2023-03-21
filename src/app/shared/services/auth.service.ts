import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {AngularFirestore,} from '@angular/fire/compat/firestore';
import {User} from "../../models/user";


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: User | null = null;

  constructor(
    private fireAuth: AngularFireAuth,
    private fireStore: AngularFirestore,
  ) {
    this.fireAuth.authState.subscribe(user => {
      if (user) {
        this.user = {
          uid: user.uid,
          email: user.email ?? '',
        }
      }
    });

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
      };
      return this.fireStore.collection('users').doc(result.user.uid).set(customUser);
    }
    throw new Error('User creation failed');
  }

  async signOut() {
    return this.fireAuth.signOut();
  }

  async getCurrentUser() {
    // return this.user;
    return await this.fireAuth.currentUser
      .then(user => {
        if (user) {
          return {
            uid: user.uid,
            email: user.email ?? '',
          } as User;
        } else {
          return null;
        }
      });
  }
}
