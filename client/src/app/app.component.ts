import { Component, ViewChild} from '@angular/core';
import { HttpService } from './http.service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private _http: HttpService, private router: Router) { }

  ngOnInit(){
    console.log('session checkin disabled for app component')
    // this.checkSession();
  }

  @ViewChild('closeLogin') loginModal;
  @ViewChild('closeSignup') signupModal;
  user;
  userLogin = {
    email: '',
    password: ''
  }
  newUser ={
    first: "", last: '', email: "", password: ''
  };

  attempts = 5;
  failure;
  
  loginSubmit() {
    console.log('cool');
    event.preventDefault();
    this._http.login(this.userLogin).subscribe(
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
          console.log('successful login');
          console.log(data.json())
          this.user = data.json();
          this._http.setUser(this.user);
          // this.loginModal.nativeElement.hidden = true;
          this.loginModal.nativeElement.click();
          console.log(this.loginModal)
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

  signupSubmit(){
    this._http.addUser(this.newUser).subscribe(
      (data)=>{
        let temp = data.json();
        // Email is taken or something went wrong
        if(temp['message']){
          console.log(temp['message']);
          this.failure = temp['message']
          this.router.navigate(['/']);
        }
        // Successful registraion 
        /*--------------------------------------------------- 
        Bit of a pain, but the old registration login didn't
        properly set the current user, so I chained the regular
        login logic to this.
        --------------------------------------------------- */
        else{
          let submission =  {email: this.newUser.email, password: this.newUser.password}
          this._http.login(submission).subscribe(
            (data)=>{
              console.log(data.json())
              let temp = data.json();
              // Wrong login credentials
              if(temp['message']){
                console.log(temp['message']);
                this.failure = temp['message']
                this.router.navigate(['/']);
              }
              // Successful login
              else{
                this.user = data.json();
                this._http.setUser(this.user);
                this.signupModal.nativeElement.click();
                this.router.navigate(['/browse']);
              }        
            },
            (err)=>{
              console.log('Something went wrong');
              console.log(err);
              this.router.navigate(['/']);        
          }
        )
        }
      }
    )
  }
  logout(){
    this._http.logout();
  }
  checkSession(){
    if ( !this.user ){
      this.logout();
    }
  }
  title = 'app';
}
 