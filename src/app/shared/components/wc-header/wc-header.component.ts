import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-wc-header',
  templateUrl: './wc-header.component.html',
  styleUrls: ['./wc-header.component.scss']
})
export class WcHeaderComponent implements OnInit {

  @Input() name = 'Ahmed';

  constructor(
    private router: Router,
  ) {
  }

  ngOnInit(): void {
  }

  async openProfile() {
    await this.router.navigate(['/profile'])
  }

}
