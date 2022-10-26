import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Highcharts from 'highcharts';
import { DatasharingService } from 'src/datasharing.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'assignment';
  covidresponse :any;
  stateCode :any;
  selectedStateData:any=[];
  Highcharts:any;
  chartOptions :any;
  stateArray:any=[];
  constructor(private http :HttpClient, private datashare:DatasharingService ,private route :Router ){}

  ngOnInit(){
    this.http.get<any>('https://data.covid19india.org/v4/min/data.min.json').subscribe(data1 => {
      this.covidresponse = data1;
      this.datashare.setCovidData(data1);
      console.log(this.covidresponse)
      this.http.get<any>('assets/StateCodes.json').subscribe(data => {
        this.stateCode = data;
        this.datashare.setStateData(data);
        console.log(this.stateCode)
        if(this.datashare.getCovidData() && this.datashare.getStateData()){
          this.datashare.selected.next(true)
        }
    })
    })
    this.datashare.selected.subscribe((ele:any)=>{
      if(ele==true){
        this.covidresponse=this.datashare.getCovidData();
        this.stateCode=this.datashare.getStateData();
    
      for (var element in this.stateCode) {
        this.stateArray.push(this.stateCode[element])
      }
        }
    });
    
  }
  selected(x:any){
    console.log(x);
    this.selectedStateData=[];
    let selectedState:any
    for (var element in this.stateCode) {
      if(this.stateCode[element] ==x){
        selectedState=element
      }
      
    }
    let selectedStateData= this.covidresponse[selectedState].districts;
    
      let data: any[][]=[]
      for (const element in selectedStateData) {
        if(selectedStateData[element].total.vaccinated1 && selectedStateData[element].total.vaccinated2){
          data.push([selectedStateData[element].total.vaccinated1 ,selectedStateData[element].total.vaccinated2])
          this.selectedStateData.push(
            {"name" : element,
              "data": selectedStateData[element]
            }
            )
        }
        
      }
      console.log(this.selectedStateData)
      // selectedStateData.forEach((element :any)=> {
        
        
        
      // });
  
      this.Highcharts = Highcharts;
      this.chartOptions = {         
         title : {
            text: 'Scatter plot'   
         },      
         series : [{
            type: 'scatter',
            zoomType:'xy',
            name: 'Browser share',
            data: data
         }]
      };
    }
  
  

}
