import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  private userService: UserServiceService;

  constructor(private router: Router, private http: HttpClient, userService: UserServiceService) {
    this.userService = userService;
  }

  ngOnInit(): void {
  }

  public logout() {
    //make an http request to the server to destroy the session
    let body = null;
    this.http.post<any>("/logout", body, { observe: "response" }).subscribe(result => {
      if (result.status != 200) {
        //server should not be able to send this
        window.alert(result.body.message);
      } else {
        //we have sucessfully logged out
        window.alert(result.body.message);
        //reset any global varaibles to none
        sessionStorage.setItem("type", "none");
        sessionStorage.setItem("name", "none");
        sessionStorage.setItem("id", "none");
        //set the global user type to none
        this.userService.logout();
      }
      this.router.navigate(["/Home"]);
    });
  }
}
