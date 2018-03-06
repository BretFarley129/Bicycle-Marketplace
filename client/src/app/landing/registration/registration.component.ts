import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  newUser ={first: "", last: '', email: "", password: ''}
  failure = '';
  user;
  constructor(private _http: HttpService, private router: Router) { }

  ngOnInit() {
  }
  onSubmit(){
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
  test(){
    console.log('test')
  }

}
