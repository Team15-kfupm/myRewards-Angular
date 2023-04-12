import {Component, OnInit} from '@angular/core';
import {Chart} from "chart.js/auto";
import {OffersService} from "../../../../services/offers.service";
import {Offer} from "../../../../models/offer";
import {Redeem} from "../../../../models/redeem";

@Component({
  selector: 'app-ages-histogram',
  templateUrl: './ages-histogram.component.html',
  styleUrls: ['./ages-histogram.component.scss']
})
export class AgesHistogramComponent implements OnInit {

  constructor(private offersService: OffersService) {
  }


  histogram!: Chart;
  offersLabels: string[] = []
  offersData: number[][] = []
  offers: Offer[] = []
  bins = [10, 20, 30, 40, 50, 60];


  dataHist = {
    labels: this.creatBinLabels(),
    datasets: [
      {
        label: "My First Dataset",
        data: [300, 50, 100],
        backgroundColor: [
          // "rgb(133, 105, 241)",
          // "rgb(164, 101, 241)",
          // "rgb(101, 143, 241)",
          "rgb(235, 59, 90)",
          "rgb(253, 126, 20)",
          "rgb(46, 204, 113)",
          "rgb(52, 152, 219)",
          "rgb(155, 89, 182)",
        ],
        hoverOffset: 4,
      },
    ],
  };


  async ngOnInit(): Promise<void> {
    await this.getAllOffers()


  }


  async getAllOffers() {
    this.offersService.getOffers().subscribe({
      next: (res) => {
        this.offers = res.map((e: any) => {
          this.offersData.push(e.payload.doc.data().ages);
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
        });

        this.dataHist = {
          labels: this.creatBinLabels(),
          datasets: this.getAllData(this.offers),
        };


        this.createChart()



      },
      error: (err) => {
        console.log(err);
      },
    });
  }


  createChart() {

    this.histogram = new Chart("histogram", {
      type: "bar",
      data:this.dataHist
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


  getAllData(offers:Offer[]){

    let data:any[]=[]
    offers.forEach(
      (offer,index)=>{

        data.push({
          label:offer.title,
          data:this.offersData[index]
        })
      }
    )


    return data;
  }



  // Function to calculate histogram data
   getHistogramData(data:number[], bins:number[]) {
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
