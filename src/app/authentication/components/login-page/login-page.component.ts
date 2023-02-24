import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder} from '@angular/forms';
import {AuthService} from "../../../shared/services/auth.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {


  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) {
  }

  loginForm = this.formBuilder.group({
    email: '',
    password: ''
  });

  ngOnInit(): void {
  }

  onSubmit(): void {
    const email = this.loginForm.value.email!;
    const password = this.loginForm.value.password!;
    this.authService.signIn(email, password);

  }
}
