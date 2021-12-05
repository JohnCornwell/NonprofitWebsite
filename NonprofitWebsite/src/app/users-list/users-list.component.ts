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

  viewVolunteer(ID: number){
    this.router.navigate(['/Volunteer/' + ID]);
  }

  viewDonor(ID: number){
    this.router.navigate(['/Donor/' + ID]);
  }

  delete(id: number): void{
    //this method is called when this user is active and the admin clicks Delete
    var body = {
    UserId: id,
    Deleted: true
    }
    this.http.post<any>("/user/delete", body, { observe: "response" }).subscribe(result => {
      if (result.status != 200) {
        window.alert("Unable to delete user.");
      } else {
        window.alert("Successfully deleted user.");
        this.router.navigate(['/Home']);
      }
  }, err => {
    window.alert(err.error.message);
  });
  }

  renew(id: number): void{
        //this method is called when this user is deleted and the admin clicks Renew
        var body = {
          UserId: id,
          Deleted: false
        }
        this.http.post<any>("/user/delete", body, { observe: "response" }).subscribe(result => {
          if (result.status != 200) {
            window.alert("Unable to renew user.");
          } else {
            window.alert("Successfully renewed user.");
            this.router.navigate(['/Home']);
          }
        }, err => {
          window.alert(err.error.message);
        });
  }

}
