import { Component, OnInit, ViewChild} from '@angular/core';
import { HttpService } from '../http.service';


@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css']
})
export class ListingsComponent implements OnInit {

  newBike = {};
  failure = '';
  user;
  userId;

  bikes = [];

  editBike = {};
  destroyBike = {};

  constructor(private _http: HttpService) { }

  ngOnInit() {
    
    //For development
    // let observable = this._http.login({email: 'test@test.com', password: "testtest"})
    // observable.subscribe(
    //   (data)=>{
    //     console.log('development code active in listings component')
    //     console.log(data.json())
    //     this._http.setUser(data.json())
    //     this.user = this._http.fetchUser();
    //     this.formatCreationDate();
    //     this.fetchListings(); 
    //     this.userId = this.user._id;
    //   }
    // )
    // End For

    this._http.verifySession();
    this.user = this._http.fetchUser();
    this.fetchListings();
    this.userId = this.user._id;
  }

  @ViewChild('closeDelete') closeDelete;
  
  formatCreationDate(){
    let tempDate = new Date(this.user.createdAt)
    let month = tempDate.getMonth();
    let day = tempDate.getDate();
    let year = tempDate.getFullYear();
    let prettyDate = `${month+1}/${day}/${year}`
    this.user.createdAt = prettyDate
  }
  logout(){
    this._http.logout();
  }
  addBike(){
    event.preventDefault();
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
          this.fetchListings();
        }
      }
    )
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

  deleteBike(bike){
    console.log('attempting delete')
    let observable = this._http.deleteBike(bike._id);
    observable.subscribe(
      data=>{
        console.log("Delete Successful.")
        this.closeDelete.nativeElement.click();
        this.fetchListings();
      }
    )
  }
  updateBike(bike){
    console.log(" This doesn't work yet")
    let observable = this._http.updateBike(bike);
    observable.subscribe(
      (data)=>{
        console.log("Update successful")
        this.fetchListings();
      }
    )
  }

  editModal(bike){
    this.editBike = bike;
  }
  deleteModal(bike){
    this.destroyBike = bike;
  }

}
