import { Component, OnInit } from '@angular/core';
import {OffersService} from "../../../../services/offers.service";
import {Offer} from "../../../../models/offer";

@Component({
  selector: 'app-stat-card',
  templateUrl: './stat-card.component.html',
  styleUrls: ['./stat-card.component.scss']
})
export class StatCardComponent implements OnInit {


  num_customers:number=110;
  num_offers!:number;
  num_redeems:number=0;
  offers!:Offer[];
  constructor(private offersService:OffersService) { }

  ngOnInit(): void {
    this.getAllOffers()

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

  get_num_redeems(offers:Offer[]){
    offers.forEach(offer=>{
      this.num_redeems+=offer.num_of_redeem
    })
  }

}
