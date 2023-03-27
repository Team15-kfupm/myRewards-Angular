import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {CashierService} from "../services/cashier.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  constructor(
    private cashierService: CashierService,
    private formBuilder: FormBuilder,
  ) {
  }

  loginForm = this.formBuilder.group({
    password: ''
  });

  ngOnInit(): void {
  }

  async onSubmit(): Promise<void> {
    const passphrase = this.loginForm.value.password!;
    await this.cashierService.login(passphrase)
      .then(value => {
        console.log('success')
        // this.router.navigate(['/redirect'])
      })
      .catch(reason => console.log(reason));
  }

}
