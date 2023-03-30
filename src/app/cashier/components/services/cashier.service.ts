import {Injectable} from '@angular/core';
import {AuthService} from "../../../shared/services/auth.service";
import {AngularFireFunctions} from "@angular/fire/compat/functions";
import {lastValueFrom} from "rxjs";


@Injectable({
  providedIn: 'root',
})
export class CashierService {
  constructor(
    private authService: AuthService,
    private fns: AngularFireFunctions) {
  }

  async login(passphrase: string): Promise<void> {
    try {
      const result = await lastValueFrom(
        this.fns.httpsCallable('cashierLogin')({passphrase: passphrase})
      ).then(async userCredentialToken => {
        console.log(userCredentialToken.cashierCredential)
        if (userCredentialToken) {
          await this.authService.signInWithCustomToken(userCredentialToken.cashierCredential);
        } else {
          throw new Error('no userCredentialToken');
        }
      });

    } catch (error) {
      console.error(error);
    }
  }

  async loginWithOTP(email: string, otp: string): Promise<void> {
    try {
      await lastValueFrom(
        this.fns.httpsCallable('cashierLoginWithOTP')({email: email, otp: otp})
      ).then(async userCredentialToken => {
        console.log(userCredentialToken)
        if (userCredentialToken) {
          await this.authService.signInWithCustomToken(userCredentialToken.cashierCredential);
        } else {
          throw new Error('no userCredentialToken');
        }
      });

    } catch (error) {
      console.error(error);
    }
  }

  async generateOTP(email: string): Promise<void> {
    try {
      await lastValueFrom(
        this.fns.httpsCallable('generateCashierOTP')({email: email}))
    } catch (error) {
      console.error(error);
    }
  }


  async logout(): Promise<void> {
    await this.authService.signOut();
  }

}
