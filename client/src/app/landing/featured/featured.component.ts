import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.css']
})
export class FeaturedComponent implements OnInit {
  // allBikes = {};
  bike = {};
  featured = {
    title: '',
    price: '',
    img_url: '',
    location: '',
    description: ''
  };
  latest = {
    title: '',
    price: '',
    img_url: '',
    location: '',
    description: ''
  };
  cheap = {
    title: '',
    price: '',
    img_url: '',
    location: '',
    description: ''
  };
  constructor(private _http: HttpService) { }

  ngOnInit() {
    this.getRandomBike();
  }

  getRandomBike(){
    let observable = this._http.randomBike();
    observable.subscribe(
      (data)=>{
        let allBikes = data.json();
        this.featured = allBikes.feat;
        this.latest = allBikes.latest;
        this.cheap = allBikes.cheap;
        console.log(this.featured)
      }
    )
  }
}
