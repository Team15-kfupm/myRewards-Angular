import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ProfileService} from "../../../services/profile.service";

@Component({
  selector: 'app-wc-header',
  templateUrl: './wc-header.component.html',
  styleUrls: ['./wc-header.component.scss']
})
export class WcHeaderComponent implements OnInit {

  @Input() name = 'Ahmed';
  storeName = ''

  constructor(
    private router: Router,
    private profileService: ProfileService) {
  }

  ngOnInit(): void {

    this.getStoreName().then(name => {
      this.storeName = name
      
    })
  }


  async openProfile() {
    await this.router.navigate(['/profile'])
  }


  async getStoreName() {
    return await this.profileService.getStoreName()
  }

}
