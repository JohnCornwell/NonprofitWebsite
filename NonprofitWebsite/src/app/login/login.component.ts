import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  isExistingUser: boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router,
    private userService: UserServiceService) {
    this.form = this.fb.group({
      Username: ['', Validators.required],
      Password: ['', Validators.required]
    });
  }

  
  ngOnInit(): void {
  }

  onSubmit() {
    this.tryLogin(this.form.get('Username')?.value, this.form.get('Password')?.value);
  }

  tryLogin(Username: String, Password: String) {
    var body = {
      Username: Username,
      Password: Password
    }
    this.http.post<any>("/login", body, { observe: "response" }).subscribe(result => {
      if (result.status != 200) {
        window.confirm(result.statusText);
      } else {
        //need to set session info in SESSION_STORAGE
        window.alert("Login successful.");
        //this stores the type of permission our user has.
        //This will not affect the level of permission the client has with the
        //server. It is only used for determining which UI elements to display
        sessionStorage.setItem("type", result.body.UserType);
        sessionStorage.setItem("name", result.body.Username);
        sessionStorage.setItem("id", result.body.UserID);
        this.userService.login(result.body.UserType);
        this.router.navigate(['/Home'])
      }
    });
/*    // if user is in database
    this.checkUserInDatabase(Username);
    if(this.isExistingUser)
    {
      var bcrypt = require('bcryptjs');
      // TODO get salt from database
      var salt = bcrypt.genSaltSync(10);//this is placeholder
      if(bcrypt.compareSync(Password, salt))
      {
        // password was right
        this.login();
      }
      else
      {
        // password was incorrrect
        
      }
    }
    else
    {
      // not an existing user

    }*/
  }

  checkUserInDatabase(Username: String){
    //TODO
    this.isExistingUser = true;
  }

  login(){
    //TODO
  }

}
