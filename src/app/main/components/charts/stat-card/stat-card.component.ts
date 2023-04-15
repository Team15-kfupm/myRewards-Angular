import {Component, OnInit} from '@angular/core';
import {OffersService} from "../../../../services/offers.service";
import {Offer} from "../../../../models/offer";
import {DataAnalysisService} from "../../../../services/data-analysis.service";

@Component({
  selector: 'app-stat-card',
  templateUrl: './stat-card.component.html',
  styleUrls: ['./stat-card.component.scss']
})
export class StatCardComponent implements OnInit {


  num_costumers!: number;
  num_offers!: number;
  num_redeems: number = 0;
  offers!: Offer[];

  constructor(private offersService: OffersService, private dataAnalysisService: DataAnalysisService) {
  }

  ngOnInit(): void {
    this.getAllOffers()
    this.getTotalCostumers()
  }

  getAllOffers() {
    this.offersService.getOffers().subscribe({
      next: (res) => {
        this.offers = res.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
        });
        this.num_offers = this.offers.length;
        this.get_num_redeems(this.offers)
      },
      error: (err) => {
        console.log(err);
      },
    });

  }

  get_num_redeems(offers: Offer[]) {
    offers.forEach(offer => {
      this.num_redeems += offer.num_of_redeem
    })
  }

  getTotalCostumers() {
    this.dataAnalysisService.getTotalCostumers().then(res => {
      this.num_costumers = res
    })

  }

}
