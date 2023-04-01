import {Component, OnInit} from '@angular/core';
import {Chart} from 'chart.js/auto';

@Component({
  selector: 'app-line-chart-tailwind',
  templateUrl: './line-chart-tailwind.component.html',
  styleUrls: ['./line-chart-tailwind.component.scss']
})
export class LineChartTailwindComponent implements OnInit {

  chart!: Chart;

  labels = ["January", "February", "March", "April", "May", "June"];
  data = {
    labels: this.labels,
    datasets: [
      {
        label: "My First dataset",
        backgroundColor: "hsl(252, 82.9%, 67.8%)",
        borderColor: "hsl(252, 82.9%, 67.8%)",
        data: [0, 10, 5, 2, 20, 30, 45],
      },
    ],
  };


  constructor() {
  }

  ngOnInit(): void {
    this.chart = new Chart('chartLine', {
      type: 'line',
      data: this.data
    });
  }

}
