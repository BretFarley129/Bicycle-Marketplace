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
  sidebarActive = true;
  search = {
    title: '',
    description: '',
    minPrice: '',
    maxPrice: ''
  };
  contactBike = {
    _user: {
      first: '',
      last: '',
      email: '',
    }
  };
  destroyBike = {
    _user: {
      first: '',
      last: '',
      email: '',
    }
  };
  // bikes: BehaviorSubject<any[]> = new BehaviorSubject([]);
  // bikes = [];
  bikesArray = [];
  ngOnInit() {
    // Code for development
    // let observable = this._http.login({email: 'test@test.com', password: "testtest"})
    // observable.subscribe(
    //   (data)=>{
    //     console.log('development code active for dashboard')
    //     console.log(data.json())
    //     this.fetchBikes();
    //     this.user = data.json();
    //     console.log(this.user)
    //   }
    // )
    this._http.verifySession();
    this.fetchBikes();
    this.user = this._http.fetchUser();
  }

  logout(){
    this._http.logout();
  }
  
  contact(bike){
    alert(`Name: ${bike._user.first} ${bike._user.last} \nEmail: ${bike._user.email}`)
  }
  setTempContact(bike){
    this.contactBike = bike;
  }
  setTempDelete(bike){
    this.destroyBike = bike;
  }
  deleteBike(bike){
    console.log("attempting delete on bike with ID", bike._id)
    let observable = this._http.deleteBike(bike._id);
    observable.subscribe(
      (data)=>{
        console.log(data)
        this.fetchBikes();
      },
      (err)=>{
        console.log(err)
      }
    )
  }
  fetchBikes(){
    let observable = this._http.getAllBikes();
    observable.subscribe(
      (data)=>{
        // this.bikes.next(data.json())
        this.bikesArray = data.json();
        console.log('got bikes!', this.bikesArray);

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                  // Sort to be implemented later
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // for ( let i = 0; i < this.bikes.length; i ++ ){
        //   this.bikesArray.push(this.bikes[i])
        // }
        // this.bikeSort('date_high');
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

  checkMin(num1, num2){
    if ( this.search.minPrice == '' || Number(this.search.minPrice) <= 0 ){
      return true
    }
    if ( num1 >= num2 ){
      return true
    }
    else{
      return false
    }
  }

  checkMax(num1, num2){
    if ( this.search.maxPrice == '' || Number(this.search.maxPrice) <= 0 ){
      return true
    }
    if ( num1 <= num2 ){
      return true
    }
    else{
      return false
    }
  }

  filterAll(bike){
    let titleCheck = this.checkString(bike.title.toLowerCase(), this.search.title.toLowerCase())
    let descriptionCheck = this.checkString(bike.description.toLowerCase(), this.search.description.toLowerCase())
    let minCheck = this.checkMin(bike.price, this.search.minPrice);
    let maxCheck = this.checkMax(bike.price, this.search.maxPrice);
    return titleCheck && descriptionCheck && minCheck && maxCheck
  }

  openNav() {
    document.getElementById("spacer").style.visibility = "visible";
    document.getElementById("mySidebar").style.width = "20vw";
    document.getElementById("shopdisp").style.marginLeft = "20%";
    document.getElementById("shopdisp").style.width= "79vw";
  }
  
  closeNav() {
    document.getElementById("spacer").style.visibility = "hidden";
    document.getElementById("mySidebar").style.width = "3vw";
    document.getElementById("shopdisp").style.marginLeft= "3vw";
    document.getElementById("shopdisp").style.width= "95.6vw";
  }
  
  toggleNav(){
    if ( this.sidebarActive ){
      this.closeNav();
      this.sidebarActive = false;
    }
    else{
      this.openNav();
      this.sidebarActive = true;
    }

  }


    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //                   Sorting algorithm to be implented later
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // bikeSort(str){
  //   switch (str){
  //     case 'price_low':
  //       for (let i = 0; i < this.bikesArray.length; i ++){
  //         let min = i;
  //         for ( let k = i + 1; k < this.bikesArray.length; k++ ){
  //           if (this.bikesArray[k].price < this.bikesArray[min].price){
  //             min = k;
  //           }
  //         }
  //         if ( min != i ){
  //           let temp = this.bikesArray[i];
  //           this.bikesArray[i] = this.bikesArray[min];
  //           this.bikesArray[min] = temp
  //         }
  //       }
  //     case 'price_high':
  //       for (let i = 0; i < this.bikesArray.length; i ++){
  //         let max = i;
  //         for ( let k = i + 1; k < this.bikesArray.length; k++ ){
  //           if (this.bikesArray[k].price > this.bikesArray[max].price){
  //             max = k;
  //           }
  //         }
  //         if ( max != i ){
  //           let temp = this.bikesArray[i];
  //           this.bikesArray[i] = this.bikesArray[max];
  //           this.bikesArray[max] = temp
  //         }
  //       }
  //     case 'date_low':
  //       for (let i = 0; i < this.bikesArray.length; i ++){
  //         let min = i;
  //         for ( let k = i + 1; k < this.bikesArray.length; k++ ){
  //           if (this.bikesArray[k].createdAt < this.bikesArray[min].createdAt){
  //             min = k;
  //           }
  //         }
  //         if ( min != i ){
  //           let temp = this.bikesArray[i];
  //           this.bikesArray[i] = this.bikesArray[min];
  //           this.bikesArray[min] = temp
  //         }
  //       }
  //     case 'date_high':
  //       for (let i = 0; i < this.bikesArray.length; i ++){
  //         let max = i;
  //         for ( let k = i + 1; k < this.bikesArray.length; k++ ){
  //           if (this.bikesArray[k].createdAt > this.bikesArray[max].createdAt){
  //             max = k;
  //           }
  //         }
  //         if ( max != i ){
  //           let temp = this.bikesArray[i];
  //           this.bikesArray[i] = this.bikesArray[max];
  //           this.bikesArray[max] = temp
  //         }
  //       }
  //     case 'title_high':
  //       for (let i = 0; i < this.bikesArray.length; i ++){
  //         let min = i;
  //         for ( let k = i + 1; k < this.bikesArray.length; k++ ){
  //           if (this.bikesArray[k].title.toLowerCase() < this.bikesArray[min].title.toLowerCase()){
  //             min = k;
  //           }
  //         }
  //         if ( min != i ){
  //           let temp = this.bikesArray[i];
  //           this.bikesArray[i] = this.bikesArray[min];
  //           this.bikesArray[min] = temp
  //         }
  //       }
  //     case 'title_low':
  //       for (let i = 0; i < this.bikesArray.length; i ++){
  //         let max = i;
  //         for ( let k = i + 1; k < this.bikesArray.length; k++ ){
  //           if (this.bikesArray[k].title.toLowerCase() < this.bikesArray[max].title.toLowerCase()){
  //             max = k;
  //           }
  //         }
  //         if ( max != i ){
  //           let temp = this.bikesArray[i];
  //           this.bikesArray[i] = this.bikesArray[max];
  //           this.bikesArray[max] = temp
  //         }
  //       }

  //   }
  // }
}
