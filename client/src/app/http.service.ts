import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import "rxjs";
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class HttpService {
  dailyBike = {};
  currentUser = {_id: ''};
  constructor(private _http: Http, private router: Router) { }
  login_attempts = 5;

  //Methods for landing page
  addUser(regParams){
    return this. _http.post('newUser', regParams);
  }
  setUser(user){
    this.currentUser = user;
    console.log("current user set to:", this.currentUser)
  }
  fetchUser(){
    return this.currentUser
  }
  logout(){
    this.currentUser = null;
    console.log("logging out...")
    this.router.navigate(['/']);
  }
  verifySession(){
    console.log('Verifying session');
    console.log(this.currentUser);
    if(!this.currentUser._id){
      console.log('You are not logged in!')
      this.logout();
    }
  }
  login(loginParams){
    console.log('Attempting to log in');
    return this._http.post('/login', loginParams);
  }
  loginFailure(){
    this.login_attempts --;
  }
  getAttempts(){
    return this.login_attempts;
  }
  resetAttempts(){
    this.login_attempts = 5;
  }
  randomBike(){
    return this._http.get('/random');
  }
  bikeOfDay(){
    let observable = this.randomBike();
    observable.subscribe(
      (data)=>{
        this.dailyBike = data.json()
        setTimeout(function(){
          this.bikeOfDay();
        }, 120000)
      }
    )
  }
  getDaily(){
    return this.dailyBike;
  }

  //Methods for listings page
  addBike(bikeParams, userId){
    return this._http.post(`/newBike/${userId}`, bikeParams);
  }
  getListings(){
    return this._http.get(`/listings/${this.currentUser._id}`)
  }
  updateBike(bike){
    return this._http.patch(`/bikes/${bike._id}`, bike)
  }

  //Methods for browse page
  getAllBikes(){
    return this._http.get('/bikes');
  }
  deleteBike(bike_id){
    return this._http.delete(`/delete/${bike_id}/${this.currentUser._id}`)
  }
}
