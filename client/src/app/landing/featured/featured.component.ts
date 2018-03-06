import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.css']
})
export class FeaturedComponent implements OnInit {

  bike = {};
  constructor(private _http: HttpService) { }

  ngOnInit() {
    this.getRandomBike();
  }

  getRandomBike(){
    let observable = this._http.randomBike();
    observable.subscribe(
      (data)=>{
        this.bike = data.json()
      }
    )
  }
}
