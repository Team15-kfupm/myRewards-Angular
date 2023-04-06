import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {AuthService} from "../../../shared/services/auth.service";


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],

})
export class LoginPageComponent implements OnInit {


  loginForm = this.formBuilder.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  reason = ""
  cashier: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.isFormValid()
  }

  getEmailErrorMessage(): string {
    if (this.loginForm.controls.email.touched) {
      if (this.loginForm.controls.email.hasError('required')) {
        return 'You must enter an email';
      }

      return this.loginForm.controls.email.hasError('email') ? 'Not a valid email' : '';
    } else
      return '';

  }

  getPasswordErrorMessage(): string {
    const passwordControl = this.loginForm.controls.password;

    if (passwordControl.touched) {
      if (passwordControl.hasError('required')) {
        return 'Password is required';
      }
      if (passwordControl.hasError('minlength')) {
        return 'Password must be at least 6 characters';
      }
    }
    return '';

  }


  async onSubmit(): Promise<void> {
    this.reason = "";
    const email = this.loginForm.value.email!;
    const password = this.loginForm.value.password!;
    await this.authService.signIn(email, password)
      .then(value => {
        console.log("Logged in", value)
        this.router.navigate(['/redirect'])
      })
      .catch(reason => {
        console.log(reason)
        if (reason) {
          this.reason = "Password or Email is not valid"
        }
      });
  }

  isFormValid(): boolean {
    return this.loginForm.valid;
  }

  toggleCashier(): void {
    this.cashier = !this.cashier;
  }

}
