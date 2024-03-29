import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {CashierService} from "../../services/cashier.service";

@Component({
  selector: 'app-cashier',
  templateUrl: './cashier.component.html',
  styleUrls: ['./cashier.component.scss']
})
export class CashierComponent {
  emailForm: FormGroup;
  otpForm: FormGroup;
  showOTPForm = false;
  checkingEmail = false;
  timer: number = 0;
  endTime: Date = new Date();
  otpIsWrong: boolean = false;
  private waitingTime = 3;

  constructor(
    private fb: FormBuilder,
    private cashierService: CashierService,
    private router: Router,
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
      this.otpIsWrong = false;
      await this.cashierService
        .loginWithOTP(this.emailForm.value.email, this.otpForm.value.otp)
        .then(value => this.router.navigate(['/redirect']))
        .catch(reason => {
          console.error('Error wrong code')
          this.otpIsWrong = true;
          console.error(reason)
        });
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
