import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatasharingService {
  dataJson :any;
  stateJson :any;
  selected = new Subject<any>();
  constructor() { }

  getCovidData(){
    return this.dataJson
  }
  
  setCovidData(data :any){
    this.dataJson=data
  }
  getStateData(){
    return this.stateJson
  }
  
  setStateData(data :any){
    this.stateJson=data
  }
}
