import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-chart-card',
  templateUrl: './chart-card.component.html',
  styleUrls: ['./chart-card.component.scss']
})
export class ChartCardComponent implements OnInit {

  @Input() title = '';
  @Input() num = '';
  @Input() unit = '';
  @Input() status = '';
  @Input() type = '';
  @Input() percentage = 0;
  constructor() { }

  ngOnInit(): void {
  }

}
