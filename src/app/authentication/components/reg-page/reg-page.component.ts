import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {AuthService} from "../../../shared/services/auth.service";

@Component({
  selector: 'app-reg-page',
  templateUrl: './reg-page.component.html',
  styleUrls: ['./reg-page.component.scss']
})
export class RegPageComponent implements OnInit {
  regForm = this.formBuilder.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    password2: new FormControl('', [Validators.required]),
  });


  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {

  }

  onSubmit(): void {
    console.log('Called !')
    const email = this.regForm.value.email!;
    const password = this.regForm.value.password!;
    this.authService.signUp(email, password)
      .then(_ => window.location.href = '/')
      .catch(_ => console.error('error'));
  }

  // ---------------validators---------------------

  getEmailErrorMessage(): string {
    if (this.regForm.controls.email.touched) {
      if (this.regForm.controls.email.hasError('required')) {
        return 'You must enter an email';
      }

      return this.regForm.controls.email.hasError('email') ? 'Not a valid email' : '';
    } else
      return '';

  }

  getPasswordErrorMessage(): string {
    const passwordControl = this.regForm.controls.password;

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

  getPassword2ErrorMessage(): string {
    const passwordControl = this.regForm.controls.password;
    const password2Control = this.regForm.controls.password2;

    if (password2Control.touched) {
      if (password2Control.hasError('required')) {
        return 'Confirm password is required';
      }

      if (password2Control.value != passwordControl.value)
        return 'It should match the original password'

      if (password2Control.hasError('passwordMismatch')) {
        return 'Passwords do not match';
      }
    }
    return '';
  }

  isFormValid(): boolean {
    return this.regForm.valid;
  }


}
