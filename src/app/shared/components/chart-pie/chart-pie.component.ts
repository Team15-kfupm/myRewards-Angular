import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-chart-pie',
  templateUrl: './chart-pie.component.html',
  styleUrls: ['./chart-pie.component.scss']
})
export class ChartPieComponent implements OnInit {

  @Input() percentage = 0;
  @Input() color = '';

  constructor() { }

  ngOnInit(): void {
  }

}
