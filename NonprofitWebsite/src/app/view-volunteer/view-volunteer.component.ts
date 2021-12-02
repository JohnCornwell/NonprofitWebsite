import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from '../interfaces/Event';
import { User } from '../interfaces/User';
import { Volunteer } from '../interfaces/Volunteer';

@Component({
  selector: 'app-view-volunteer',
  templateUrl: './view-volunteer.component.html',
  styleUrls: ['./view-volunteer.component.css']
})
export class ViewVolunteerComponent implements OnInit {

  eventsData: Array<Event> = new Array<Event>(); //upcoming events that were volunteered for
  volunteers: Array<Volunteer> = new Array<Volunteer>(); //holds status values for the array
  form: FormGroup;
  //initialize to an invalid user
  ID = -1; //this is the id given in the url
  myUser: User = {
    UserID: -1, Username: 'donor', FirstName: '', MiddleName: '',
    LastName: '', UserType: '', Deleted: false
  };
  //total hours volunteered
  totalHours = 0.0;

  get eventsFormArray() {
    return this.form.controls.events as FormArray;
  }

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private router: Router, private http: HttpClient) {
    this.form = this.formBuilder.group({
      SelectEvent: [''],
      events: new FormArray([])
    });
  }

  ngOnInit(): void {
    this.ID = this.route.snapshot.params?.id;
    if (this.ID != undefined) {
      //there exists a UserID to check for
      this.getUser()
      //if getUser finds a user, it will populate the arrays
    }
  }

  getUser() {
    //get the user that was given in the url
    var body = {
      UserId: this.ID
    }
    this.http.post<any>("/user/retrieveById", body, { observe: "response" }).subscribe(result => {
      if (result.status != 200) {
        window.alert("Unable to retrieve user info.");
        this.router.navigate(['/Users']);
      } else {
        this.myUser = {
          UserID: result.body[0].UserID,
          Username: result.body[0].Username,
          FirstName: result.body[0].FirstName,
          MiddleName: result.body[0].MiddleName,
          LastName: result.body[0].LastName,
          UserType: result.body[0].UserType,
          Deleted: result.body[0].Deleted
        };
        //now that we have a valid user, get its relevant data
        this.populateVolunteersAndEvents();
      }
    }, err => {
      window.alert(err.error.message);
      this.router.navigate(['/Users']);
    });
  }

  populateVolunteersAndEvents() {
    //get all of the EventIDs that this volunteer is volunteered to (includes cancelled)
    //get this user's id. If there is none in storage, send the invalid -1 id
    const userId = this.ID;
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
          //consider only adding dates that are for today or the future
          let m: String = event.Month.toString(10);
          let d: String = event.Day.toString(10);
          let sh: String = event.StartHour.toString(10);
          let sm: String = event.StartMinute.toString(10);
          let eh: String = event.EndHour.toString(10);
          let em: String = event.EndMinute.toString(10);
          if (m.length == 1) {
            m = '0' + m;
          }
          if (d.length == 1) {
            d = '0' + d;
          }
          if (sh.length == 1) {
            sh = '0' + sh;
          }
          if (sm.length == 1) {
            sm = '0' + sm;
          }
          if (eh.length == 1) {
            eh = '0' + eh;
          }
          if (em.length == 1) {
            em = '0' + em;
          }
          event.MonthString = m;
          event.DayString = d;
          event.YearString = event.Year.toString(10);
          event.StartHourString = sh;
          event.StartMinuteString = sm;
          event.EndHourString = eh;
          event.EndMinuteString = em;
          //if this is not a canceled event, and the user is attending,
          //add the volunteered hours to the total
          //we will need to search for the volunteer slot again, because there is no way
          //to preserve the index that was used to make this call (using body to store the
          //index does not work).
          var j;
          for (j = 0; j < this.volunteers.length; j++){
            if (this.volunteers[j].EventID == event.EventID) {
              break;
            }
          }
          if (this.volunteers[j].Deleted == false && event.Deleted == false) {
            this.totalHours += event.EndHour - event.StartHour;
            console.log("Adding " + (event.EndHour - event.StartHour) + " hours");
            this.totalHours += (event.EndMinute - event.StartMinute) / 60;
            console.log("Adding " + ((event.EndMinute - event.StartMinute) / 60) + " minutes");
            console.log("index is " + j + " and event is " + event.Name);
          }
          //now that we have the event, add it to our list
          this.eventsData.push(event);
        }
      }, err => {
        window.alert(err.error.message);
      }); //end of http request
    } //end of for loop
  }

  Renew() {
    //this method is called when this user is deleted and the admin clicks Renew
    var body = {
      UserId: this.myUser.UserID,
      Deleted: false
    }
    this.http.post<any>("/user/delete", body, { observe: "response" }).subscribe(result => {
      if (result.status != 200) {
        window.alert("Unable to renew user.");
      } else {
        window.alert("Successfully renewed user.");
        this.router.navigate(['/Users']);
      }
    }, err => {
      window.alert(err.error.message);
    });
  }

  Delete() {
    //this method is called when this user is active and the admin clicks Delete
    var body = {
      UserId: this.myUser.UserID,
      Deleted: true
    }
    this.http.post<any>("/user/delete", body, { observe: "response" }).subscribe(result => {
      if (result.status != 200) {
        window.alert("Unable to delete user.");
      } else {
        window.alert("Successfully deleted user.");
        this.router.navigate(['/Users']);
      }
    }, err => {
      window.alert(err.error.message);
    });
  }
}
