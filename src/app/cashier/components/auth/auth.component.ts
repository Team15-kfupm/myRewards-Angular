import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CashierService} from "../services/cashier.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  emailForm: FormGroup;
  otpForm: FormGroup;
  showOTPForm = false;
  checkingEmail = false;
  private waitingTime = 3;
  timer: number = 0;
  endTime: Date = new Date();

  constructor(
    private fb: FormBuilder,
    private cashierService: CashierService
  ) {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.otpForm = this.fb.group({
      otp: new FormControl({value: '', disabled: true}, Validators.required),
    });

  }

  onEmailSubmit() {
    if (this.emailForm.valid) {
      this.checkingEmail = true;
      this.cashierService.generateOTP(this.emailForm.value.email)
        .then(() => {
          this.startCounter();
          this.startOTPVerification();
        })
    }
  }

  async onOTPSubmit() {
    if (this.otpForm.valid) {
      // Perform actions after OTP form is submitted
      console.log('OTP form submitted');
      await this.cashierService
        .loginWithOTP(this.emailForm.value.email, this.otpForm.value.otp)
        .then(() => console.log('Logged in'))
        .catch(() => console.log('Failed to log in'));
    }
  }

  private startOTPVerification() {
    this.checkingEmail = false;
    this.showOTPForm = true;
    this.emailForm.disable();
    this.otpForm.enable();
  }

  private startCounter() {
    console.log('Starting counter')
    this.endTime = new Date(new Date().getTime() + this.waitingTime * 60 * 1000);
    this.timer = this.endTime.getTime() - new Date().getTime();
    const intervalId = setInterval(() => {
      const remainingTime = this.endTime.getTime() - new Date().getTime();
      if (remainingTime <= 0) {
        this.emailForm.enable();
        this.timer = 0;
        clearInterval(intervalId);
      } else {
        this.timer = remainingTime;
      }
    }, 1000);
  }


}
