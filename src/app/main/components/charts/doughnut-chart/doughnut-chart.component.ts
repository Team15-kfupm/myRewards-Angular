import {Component, OnInit} from '@angular/core';
import {Chart} from "chart.js/auto";
import {OffersService} from "../../../../services/offers.service";
import {Offer} from "../../../../models/offer";

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss']
})
export class DoughnutChartComponent implements OnInit {


  offers: Offer[] = []
  offersLabels: string[] = []
  offersData: number[] = []
  doughnutChart!: Chart
  noData: boolean = false;


  loaded = false;
  dataDoughnut = {
    labels: this.getLabels(this.offers),
    datasets: [
      {
        label: "My First Dataset",
        data: [300, 50, 100],
        backgroundColor: [
          "rgb(133, 105, 241)",
          "rgb(164, 101, 241)",
          "rgb(101, 143, 241)",
        ],
        hoverOffset: 4,
      },
    ],
  };


  constructor(private offersService: OffersService) {
  }

  ngOnInit(): void {


    this.getAllOffers()

  }


  async getAllOffers() {
    this.offersService.getOffers().subscribe({
      next: (res) => {
        this.offers = res.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
        });

        this.offersLabels = this.getLabels(this.offers);
        this.offersData = this.getData(this.offers);

        this.dataDoughnut = {
          labels: this.offersLabels,
          datasets: [
            {
              label: "Offers that has been redeemed",
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
    this.doughnutChart = new Chart("chartDoughnut", {
      type: "doughnut",
      data: this.dataDoughnut,
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
      offerData.push(e.num_of_redeem))

    return offerData;
  }

}
