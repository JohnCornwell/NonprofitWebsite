import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

/*
 * This file is responsible for creating an account for a guest
 * user. This includes validating that all required fields are
 * filled. The unique username constraint will be enforced by
 * the server.
 */

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
    /* create a new volunteer or donor account. The password will be hashed by the database */
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
      if (result.status != 200) {
        window.alert(result.statusText);
      } else {
        window.alert("Signup successful.");
        this.router.navigate(['/Login'])
      }
    }, err => {
      window.alert(err.error.message);
    });
  }
}
