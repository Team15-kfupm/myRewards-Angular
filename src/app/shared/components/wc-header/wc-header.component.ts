import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-wc-header',
  templateUrl: './wc-header.component.html',
  styleUrls: ['./wc-header.component.scss']
})
export class WcHeaderComponent implements OnInit {

  @Input() name = 'Ahmed';

  constructor() { }

  ngOnInit(): void {
  }

}
