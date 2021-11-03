import { HttpClient, HttpRequest } from '@angular/common/http';
import { Component, OnInit, ɵCodegenComponentFactoryResolver } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { get } from 'http';
import { type } from 'os';

@Component({
  selector: 'app-account-create',
  templateUrl: './account-create.component.html',
  styleUrls: ['./account-create.component.css']
})
export class AccountCreateComponent implements OnInit {

  form: FormGroup;
  passwordsDontMatch: boolean = false;
  isUsernameTaken: boolean = false;
  isAccountNotChosen: boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) { 
    this.form = this.fb.group({
      Name: ['', Validators.required],
      Lastname: ['', Validators.required],
      Middlename: [''],
      Username: ['', Validators.required],
      Password: ['', Validators.required],
      PasswordCheck: ['', Validators.required],
      Type: ['',Validators.required]
    });
  }

  
  ngOnInit(): void {
  }

  onSubmit() {
    this.createAccount(
      this.form.get('Name')?.value,
      this.form.get('Lastname')?.value,
      this.form.get('Middlename')?.value,
      this.form.get('Username')?.value,
      this.form.get('Password')?.value,
      this.form.get('PasswordCheck')?.value,
      this.form.get('Type')?.value
    );
  }

  createAccount(Name: String, Lastname: String, Middlename: String, Username: String, Password: String, PasswordCheck: String, Type: String){
    var body = {
      Username: Username,
      Password: Password,
      FirstName: Name,
      MiddleName: Middlename,
      LastName: Lastname,
      UserType: Type,
      Deleted: false
    }
    this.http.post<any>("/signup", body, { observe: "response" }).subscribe(result => {
      if (result.status != 201) {
        window.confirm(result.statusText);
      } else {
        window.alert("Signup successful.");
        this.router.navigate(['/Login'])
      }
    });
  }
  
  validateAccount(Username: String, Password: String, PasswordCheck: String){
  let returnValue = true;
    // Username check
    //TODO query database for username
    if(false){
      this.isUsernameTaken = true;
      returnValue = false;
    }
    else{
      this.isUsernameTaken = false;
    }
    // Password double check
    if(Password === PasswordCheck){
      this.passwordsDontMatch = false;
      // hash the password
      var bcrypt = require('bcryptjs');
      // create salt
      // var salt = bcrypt.genSaltSync(randomInt(Number.MAX_SAFE_INTEGER));
      // var hash = bcrypt.hashSync(Password, salt);
      //TODO store salt and hash in database
    }
    else
    {
      this.passwordsDontMatch = true;
      returnValue = false;
    }
    return returnValue;
  }
}
