import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  constructor(private _http: HttpService) { }

  bikes = [];
  ngOnInit() { 
    this.fetchListings();
  }

  fetchListings(){
    let observable = this._http.getListings();
    observable.subscribe(
      (data)=>{
        this.bikes = data.json()['listings'];
        console.log(this.bikes)
        console.log('got your listings!')
      }
    )
  }

  fetch2(){
    let observable = new Observable()
  }

  deleteBike(bike){
    console.log('attempting delete')
    let observable = this._http.deleteBike(bike._id);
    observable.subscribe(
      data=>{
        console.log("Delete Successful.")
      }
    )
    observable.forEach((value)=>{
      console.log('aaaaaa')
    })
  }
  updateBike(bike){
    console.log(" This doesn't work yet")
  }
}
