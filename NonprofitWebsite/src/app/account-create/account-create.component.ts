import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, RadioControlValueAccessor } from '@angular/forms';

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

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      Username: ['', Validators.required],
      Password: ['', Validators.required],
      PasswordCheck: ['', Validators.required]
    });
  }

  
  ngOnInit(): void {
  }

  onSubmit() {
    this.createAccount(
      this.form.get('Username')?.value,
      this.form.get('Password')?.value,
      this.form.get('PasswordCheck')?.value
    );
  }

  createAccount(Username: String, Password: String, PasswordCheck: String){
    // Username check
    //TODO query database for username
    if(false){
      this.isUsernameTaken = true;
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
      return;
    }
  }
}