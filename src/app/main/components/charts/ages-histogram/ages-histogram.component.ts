import {Component, OnInit} from '@angular/core';
import {Chart} from "chart.js/auto";
import {OffersService} from "../../../../services/offers.service";
import {Offer} from "../../../../models/offer";
import {Redeem} from "../../../../models/redeem";
import {DataAnalysisService} from "../../../../services/data-analysis.service";

@Component({
  selector: 'app-ages-histogram',
  templateUrl: './ages-histogram.component.html',
  styleUrls: ['./ages-histogram.component.scss']
})
export class AgesHistogramComponent implements OnInit {

  histogram!: Chart;
  offers: Offer[] = []
  bins = [10, 20, 30, 40, 50, 60];
  showSpinner: boolean = false;
  showNoData: boolean = true;

  dataHist = {
    labels: this.creatBinLabels(),
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


  constructor(private offersService: OffersService, private dataService: DataAnalysisService) {
  }

  ngOnInit(): void {
    this.getAllOffers()
  }


  async getAllOffers() {
    this.showSpinner = true
    this.offersService.getOffers().subscribe({
      next: (res) => {
        this.offers = res.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
        });

        this.showNoData = this.offers.length == 0
        this.createChart()

      },
      error: (err) => {
        console.log(err);
      },
    });
  }


  async createChart() {

    this.showSpinner = false;


    let data = await this.getAllData(this.offers)

    this.dataHist = {
      labels: this.creatBinLabels(),
      datasets: data,
    };


    this.histogram = new Chart("histogram", {
      type: "bar",
      data: this.dataHist
    });

  }


  //Creates Bin Labels
  creatBinLabels() {
    const binLabels = [];
    for (var i = 0; i < this.bins.length - 1; i++) {
      binLabels.push(this.bins[i] + "-" + this.bins[i + 1]);
    }
    return binLabels;
  }


  async getAllData(offers: Offer[]) {


    let data: any[] = []
    let backgroundColors: any[] = [
      "rgb(133, 105, 241)",
      "rgb(164, 101, 241)",
      "rgb(101, 143, 241)",
      "rgb(142, 116, 255)",
      "rgb(120, 129, 242)",
      "rgb(144, 123, 239)",
      "rgb(138, 135, 255)",
      "rgb(120, 120, 255)",
      "rgb(144, 116, 231)"

    ]
    for (const [index, offer] of offers.entries()) {
      let ages: number[] = []
      await this.dataService.getAgesForOffer(offer).then(
        res => {
          ages = res
          data.push({
            label: offer.title,
            data: this.getHistogramData(ages, this.bins),
            backgroundColor: backgroundColors[index % backgroundColors.length]

          })
        }
      )

    }

    return data;
  }


  // Function to calculate histogram data
  getHistogramData(data: number[], bins: number[]) {
    var histogramData = Array(bins.length - 1).fill(0);
    for (var i = 0; i < data.length; i++) {
      for (var j = 0; j < bins.length - 1; j++) {
        if (data[i] >= bins[j] && data[i] < bins[j + 1]) {
          histogramData[j]++;
          break;
        }
      }
    }
    return histogramData;
  }

}
