import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';

@Component({
  selector: 'app-new-bike',
  templateUrl: './new-bike.component.html',
  styleUrls: ['./new-bike.component.css']
})
export class NewBikeComponent implements OnInit {
  newBike = {};
  failure = '';
  user;
  userId;
  constructor(private _http: HttpService) { }

  ngOnInit() {
    this.user = this._http.fetchUser();
    this.userId = this.user._id;
  }
  onSubmit(){
    this._http.addBike(this.newBike, this.userId).subscribe(
      (data)=>{
        console.log(data.json())
        let temp = data.json();
        // Email is taken or something went wrong
        if(temp['message']){
          console.log(temp['message']);
          this.failure = temp['message']
        }
        // Successful registraion
        else{
          let bike = data.json();
          console.log(bike)
          this.newBike = {};
        }
      }
    )
  }

}
