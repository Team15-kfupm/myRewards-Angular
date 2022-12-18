import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-offer-form',
  templateUrl: './offer-form.component.html',
  styleUrls: ['./offer-form.component.scss']
})
export class OfferFormComponent implements OnInit {

  constructor(private http:HttpClient,
             private dialogRef: MatDialogRef<OfferFormComponent>) { }

  ngOnInit(): void {
  }

  sendRequest(offer:[name:string, desc:string, sDate:string, validity:string]){
    console.log(offer)
    this.http.post('https://myrewards-e3b0c-default-rtdb.firebaseio.com/Offers.json',offer).subscribe((res)=>{
      console.log(res);
      this.dialogRef.close()
    })
  }

  closeDialog():void{
    this.dialogRef.close()
  }

}
