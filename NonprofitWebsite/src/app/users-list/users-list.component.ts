import { User } from '../interfaces/User';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Volunteer } from '../interfaces/Volunteer';
import { Event } from '../interfaces/Event';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  //list of users in the system
  userList: Array<User> = new Array<User>();

  //the following variables are used for a volunteer that is being deleted
  //upcoming events that were volunteered for
  eventsData: Array<Event> = new Array<Event>();
  //holds status values for the event array
  volunteers: Array<Volunteer> = new Array<Volunteer>();

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
  }

  viewVolunteer(ID: number){
    this.router.navigate(['/Volunteer/' + ID]);
  }

  viewDonor(ID: number){
    this.router.navigate(['/Donor/' + ID]);
  }
  
  delete(id: number, user: User): void{
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
        if (user.UserType == "Volunteer") {
          //we need to get the volunteers table entries and events that this user has volunteered for.
          this.eventsData = new Array<Event>();
          this.volunteers = new Array<Volunteer>();
          this.populateVolunteersAndEvents(user.UserID);
          //now that we have our volunteer slots, cancel all future slots
          for (var i = 0; i < this.eventsData.length; i++) {
            this.Cancel(i, user.UserID);
          }
        }
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

  populateVolunteersAndEvents(userId: number) {
    //this method is called when a volunteer is being deleted and we need to cancel future
    //volunteer slots.
    //get all of the EventIDs that this volunteer is volunteered to (includes cancelled)
    var body = {
      UserId: userId
    }
    this.http.post<any>("/volunteers/retrieveEvents", body, { observe: "response" }).subscribe(result => {
      if (result.status != 200) {
        window.alert(result.body.message + "Unable to display event data.");
      } else {
        //set up readable strings for every Event before adding it to the array for display
        result.body.forEach((volunteers: Volunteer) => {
          this.volunteers.push(volunteers);
        }); //end of iterator
        //now that we have all of the EventIDs, find the events
        this.populateEvents();
      }
    }, err => {
      window.alert(err.error.message);
    });
  }

  populateEvents() {
    //this method is called when a volunteer is being deleted and we need to cancel future
    //volunteer slots.
    //based on the EventIDs in the volunteers list, get the events with those ids.
    for (var i = 0; i < this.volunteers.length; i++) {
      //collect the id for the query
      var body = {
        EventId: this.volunteers[i].EventID
      }
      //make the request
      this.http.post<any>("/event/retrieveById", body, { observe: "response" }).subscribe(result => {
        if (result.status != 200) {
          window.alert(result.body.message + "Unable to retrieve event data.");
        } else {
          //we have an event, so pair it with the volunteers entry
          var event: Event = result.body[0];
          //now that we have the event, add it to our list
          this.eventsData.push(event);
        }
      }, err => {
        window.alert(err.error.message);
      }); //end of http request
    } //end of for loop
  }

  Cancel(i: number, userId: number) {
    //this method is called when a volunteer wants to cancel their volunteered slot.
    //We must check that the event is in the future. Then, update the volunteers table
    //and add a slot to the related event
    //date months are zero indexed
    var myEvent: Event = this.eventsData[i];
    let eventDate = new Date(myEvent.Year, myEvent.Month - 1, myEvent.Day, 0, 0, 0);
    let today = new Date(); //the current date
    //this is today without the current time
    let todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    if (todayStart.valueOf() > eventDate.valueOf()) {
      window.alert("Cannot cancel volunteer slot for an event in the past.");
      return;
    }
    //we will use body to send data to the server
    var body = {
      UserId: userId,
      EventId: this.volunteers[i].EventID,
      Deleted: true,
      VolunteerNeed: this.eventsData[i].VolunteerNeed + 1 //add one back to the slot
    }
    //make the requests to the server
    this.http.post<any>('volunteers/update', body, { observe: "response" }).subscribe(result => {
      if (result.status != 200) {
        window.alert(result.body.message + "Unable to update volunteer data.");
      } else {
        //successfully updated the volunteers table, so update the event
        this.http.post<any>('event/volunteer', body, { observe: "response" }).subscribe(result => {
          if (result.status != 200) {
            window.alert(result.body.message + "Unable to update event data.");
          } else {
            //we have sucessfully cancelled the volunteer slot
            window.alert("Sucessfully cancelled volunteer slot.")
            this.router.navigate(["Home"]);
          }
        }, err => {
          window.alert(err.body.message);
        }); //end of http events/volunteer request
      } //end of else
    }, err => {
      window.alert(err.body.message);
    }); //end of http volunteers/update request
  }
}
