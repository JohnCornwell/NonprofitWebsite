import { User } from '../interfaces/User';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

    //list of users in the system
    userList: Array<User> = new Array<User>();

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
     // Get list of all events that the user can volunteer for (in the future, not currently
    // attending, and has space).
    this.http.get<any>("/user/list", { observe: "response" }).subscribe(result => {
      if (result.status != 200) {
        window.alert("Error in requesting event list from server.");
      } else {
        //set up readable strings for every user before adding it to the array for display
        result.body.forEach((user: User) => {
          this.userList.push(user);
        }); //end of iterator
      }
    });

    console.log(this.userList);
  }

  delete(): void{
    console.log("Delete!")
  }

  renew(): void{
    console.log("Renew!")
  }

}
