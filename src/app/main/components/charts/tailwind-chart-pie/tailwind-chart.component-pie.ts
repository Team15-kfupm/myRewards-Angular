import {Component, OnInit} from '@angular/core';
import {Chart} from "chart.js/auto";
import {OffersService} from "../../../../services/offers.service";
import {Offer} from "../../../../models/offer";

@Component({
  selector: 'app-tailwind-chart-pie',
  templateUrl: './tailwind-chart.component-pie.html',
  styleUrls: ['./tailwind-chart.component-pie.scss']
})
export class TailwindChartComponentPie implements OnInit {

  chart!: Chart
  offers: Offer[] = []
  offersLabels: string[] = []
  offersData: number[] = []

  pieData = {
    labels: this.getLabels(this.offers),
    datasets: [
      {
        label: 'Dataset 1',
        data: [50, 20, 96],
        backgroundColor: [
          "rgb(133, 105, 241)",
          "rgb(164, 101, 241)",
          "rgb(101, 143, 241)",
        ],
        hoverOffset: 4,

      }
    ]
  };
  noData: boolean = true;

  constructor(private offersService: OffersService) {
  }


  ngOnInit(): void {
    //this.getAllOffers()
  }


  async getAllOffers() {
    this.offersService.getOffers().subscribe({
      next: (res) => {
        this.offers = res.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
        });
        // this.no_Offers = this.offers.length === 0;
        this.offersLabels = this.getLabels(this.offers);
        this.offersData = this.getData(this.offers);

        this.pieData = {
          labels: this.offersLabels,
          datasets: [
            {
              label: "The Amount in Saudi Riyals",
              data: this.offersData,
              backgroundColor: [
                "rgb(133, 105, 241)",
                "rgb(164, 101, 241)",
                "rgb(101, 143, 241)",
                "rgb(142, 116, 255)",
                "rgb(120, 129, 242)",
                "rgb(144, 123, 239)",
                "rgb(138, 135, 255)",
                "rgb(120, 120, 255)",
                "rgb(144, 116, 231)"

              ],
              hoverOffset: 4,
            },
          ],
        };

        this.noData = this.offers.length == 0
        this.createChart()


      },
      error: (err) => {
        console.log(err);
      },
    });
  }


  createChart() {
    this.chart = new Chart("pieChart", {
      type: "doughnut",
      data: this.pieData,
    });

  }


  getLabels(offers: Offer[]) {

    let offersLabels: string[] = []

    offers.forEach(offer => {
      offersLabels.push(offer.title)
    })

    return offersLabels
  }


  getData(offers: Offer[]) {
    let offerData: number[] = []

    offers.forEach(e =>
      offerData.push((e.num_of_redeem * 0.8 * e.worth_points)))

    return offerData;
  }


}
