import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormBuilder} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-reg-page',
  templateUrl: './reg-page.component.html',
  styleUrls: ['./reg-page.component.scss']
})
export class RegPageComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) {
  }

  loginForm = this.formBuilder.group({
    email: '',
    password: '',
    password2: '',
  });

  ngOnInit(): void {
  }

  onSubmit(): void {
    const email = this.loginForm.value.email!;
    const password = this.loginForm.value.password!;
    this.authService.signUp(email, password)
      .then(value => console.log('signed up'))
      .catch(reason => console.warn('error'));
  }


}
