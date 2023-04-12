import firebase from "firebase/compat/app";
import Timestamp = firebase.firestore.Timestamp;

export interface Redeem {
  by:string,
  age:number,
  made_at:Timestamp
}
