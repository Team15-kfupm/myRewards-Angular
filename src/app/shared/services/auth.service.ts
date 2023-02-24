import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {AngularFirestore,} from '@angular/fire/compat/firestore';
import {User} from "../../models/user";
import {map, Observable, of, switchMap} from "rxjs";
import firebase from "firebase/compat";
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<User | null>;

  constructor(
    private fireAuth: AngularFireAuth,
    private fireStore: AngularFirestore
  ) {
    this.user$ = this.fireAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.getUserById(user.uid);
        } else {
          return of(null);
        }
      })
    );
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

  private getUserById(uid: string): Observable<User> {
    const docRef = this.fireStore.collection('users').doc(uid);
    return docRef.get().pipe(
      map((doc: DocumentSnapshot<unknown>) => {
        return doc.data() as User;
      })
    );
  }
}
