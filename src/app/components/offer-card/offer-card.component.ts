import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-offer-card',
  templateUrl: './offer-card.component.html',
  styleUrls: ['./offer-card.component.scss']
})
export class OfferCardComponent implements OnInit {

  @Input() title = '';
  @Input() description = '';
  @Input() image = '';
  @Input() sDate = '';
  @Input() eDate = '';
  constructor() { }

  ngOnInit(): void {
  }

}
