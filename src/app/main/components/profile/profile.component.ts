import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {ProfileService} from "../../../services/profile.service";
import {Profile} from "../../../models/profile";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-forms-page',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  private profile$!: Profile;

  accountDetailsForm = this.formBuilder.group({
    organizationName: '',
  });

  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private activatedRoute: ActivatedRoute
  ) {
  }


  ngOnInit(): void {
    console.log("ProfileComponent.ngOnInit()");
    this.profile$ = this.activatedRoute.snapshot.data['profile'];
    this.accountDetailsForm.setValue({
      organizationName: this.profile$.organizationName!
    });
  }

  async onSubmitAccountDetails(value: any) {
    Object.assign(this.profile$, value);
    await this.profileService.updateProfile(value)
  }

  onSubmitUserDetails(value: any) {
    console.log(value);
  }
}
