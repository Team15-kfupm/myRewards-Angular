import {Component, OnInit} from '@angular/core';
import {Chart} from "chart.js/auto";

@Component({
  selector: 'app-tailwind-chart-pie',
  templateUrl: './tailwind-chart.component-pie.html',
  styleUrls: ['./tailwind-chart.component-pie.scss']
})
export class TailwindChartComponentPie implements OnInit {

  chart!: Chart

  data = {
    maintainAspectRatio: false,
    labels: ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [20, 20, 20, 20, 20, 50, 90, 80],
        backgroundColor: [
          "rgb(133, 105, 241)",
          "rgb(164, 101, 241)",
          "rgb(101, 143, 241)",
        ],
        hoverOffset: 5,

      }
    ]
  };

  constructor() {
  }


  ngOnInit(): void {


    this.chart = new Chart('pieChart', {
      type: 'pie',
      data: this.data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
          }
        }
      },
    });
  }
}
