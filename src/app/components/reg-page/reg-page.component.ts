import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-reg-page',
  templateUrl: './reg-page.component.html',
  styleUrls: ['./reg-page.component.scss']
})
export class RegPageComponent implements OnInit {

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }

  sendRequest(user:[email:string, username:string, pass1:string, pass2:string]){
    console.log(user)
    this.http.post('https://myrewards-e3b0c-default-rtdb.firebaseio.com/Users.json',user).subscribe((res)=>{
      console.log(res);
    })
  }

}
