import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-forms-page',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userDetailsForm = this.formBuilder.group({
    fullName: '',
  })

  accountDetailsForm = this.formBuilder.group({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  constructor(
    private formBuilder: FormBuilder,
  ) {
  }


  ngOnInit(): void {
  }

  onSubmitAccountDetails(value: any) {
    console.log(value);
  }

   onSubmitUserDetails(value: any){
    console.log(value);
  }
}
