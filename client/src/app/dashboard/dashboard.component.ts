import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private _http: HttpService) { }
  user;
  search = {filter: ''};
  bikes: BehaviorSubject<any[]> = new BehaviorSubject([]);
  ngOnInit() {
    //Code for development
    let observable = this._http.login({email: 'test@test.com', password: "testtest"})
    observable.subscribe(
      (data)=>{
        this.fetchBikes();
        this.user = this._http.fetchUser();
      }
    )
    // this._http.verifySession();
    // this.fetchBikes();
    // this.user = this._http.fetchUser();
  }

  logout(){
    this._http.logout();
  }
  
  contact(bike){
    alert(`Name: ${bike._user.first} ${bike._user.last} \nEmail: ${bike._user.email}`)

  }
  deleteBike(bike, index){
    console.log("attempting delete on bike with ID", bike._id)
    let observable = this._http.deleteBike(bike._id);
    observable.subscribe(
      data=>{
        console.log(data.json())
        this.fetchBikes();
      }
    )
  }
  fetchBikes(){
    let observable = this._http.getAllBikes();
    observable.subscribe(
      (data)=>{
        this.bikes.next(data.json())
        console.log('got bikes!', this.bikes);
      }
    )
  }
  hideBike(index){
    console.log('Attempting to hide div id', index)
    document.getElementById(`${index}`).innerHTML = "";
  }
  checkString(str1, str2){
    if (str1.includes(str2)){
      return true
    }
    else{
      return false
    }
  }

}
