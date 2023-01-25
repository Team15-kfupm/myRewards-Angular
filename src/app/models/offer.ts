import {Timestamp} from "rxjs";

export class Offer {


  constructor(public id:string, public title:string,public description:string, public image:string, public startDate:string, public validityPeriod:number){}
}
