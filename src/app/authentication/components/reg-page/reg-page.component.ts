import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {AuthService} from "../../../shared/services/auth.service";

@Component({
  selector: 'app-reg-page',
  templateUrl: './reg-page.component.html',
  styleUrls: ['./reg-page.component.scss']
})
export class RegPageComponent implements OnInit {
  loginForm = this.formBuilder.group({
    email: '',
    password: '',
    password2: '',
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
    const email = this.loginForm.value.email!;
    const password = this.loginForm.value.password!;
    this.authService.signUp(email, password)
      .then(_ => window.location.href = '/')
      .catch(_ => console.error('error'));
  }


}
