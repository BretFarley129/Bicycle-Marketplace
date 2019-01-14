import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user ={};
  attempts;
  failure;
  constructor(private _http: HttpService, private router: Router) {}

  ngOnInit() {
    this.getAttempts(); 
  }
  onSubmit() {
    console.log('cool');
    event.preventDefault();
    this._http.login(this.user).subscribe(
      (data)=>{
        console.log(data.json())
        let temp = data.json();
        // Wrong login credentials
        if(temp['message']){
          console.log(temp['message']);
          this.failure = temp['message']
          this._http.loginFailure();
          this.getAttempts();
          this.router.navigate(['/']);
        }
        // Successful login
        else{
          this.user = data.json();
          this._http.setUser(this.user);
          this.router.navigate(['/browse']);
        }        
      },
      (err)=>{
        console.log('Something went wrong');
        console.log(err);
        this.router.navigate(['/']);        
    }
  )};
  getAttempts(){
    this.attempts = this._http.getAttempts();
    if (this.attempts == 0){
      let temp = this._http;
      let temp2 = this;
      let message = this.failure
      alert("You have been locked out due to too many errant attempts");
      setTimeout(function(){
        temp.resetAttempts();
        temp2.getAttempts();
        message = ''
        alert("You may log in again");
      }, 60000); //Bans Login for a minute
    }
  }

}
