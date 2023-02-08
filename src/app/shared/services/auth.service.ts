import {Injectable, isDevMode, NgZone} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {
  AngularFirestore,
} from '@angular/fire/compat/firestore';
import {TimeoutError} from "rxjs";


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: any

  constructor(
    private fireAuth: AngularFireAuth,
    private firestore: AngularFirestore,
  ) {
    this.fireAuth.authState.subscribe((user) => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user)); // store the user in the localStorage
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    })
  }

  async signIn(email: string, password: string) {
    try {
      await this.fireAuth.signInWithEmailAndPassword(email, password);
      setTimeout(() => {
        window.location.href = '/';
      }, 1000)
    } catch (reason) {
      // todo: add errors
    }
  }

  async signUp(email: string, password: string) {
    try {
      await this.fireAuth.createUserWithEmailAndPassword(email, password);
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    } catch (reason) {

    }
  }

  signOut() {
    this.fireAuth.signOut().then(value => {
      localStorage.removeItem('user');
    })
  }

  isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    console.log(user);
    if (isDevMode()) {
      return user !== null;
    } else {
      return user !== null && user.emailVerified !== false;
    }
  }


}
