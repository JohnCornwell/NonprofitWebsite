import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Event } from '../interfaces/Event';
import { Volunteer } from '../interfaces/Volunteer';

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.css']
})
export class MyEventsComponent implements OnInit {
  wellText: String = "Click an event to see the description.";
  form: FormGroup;
  eventsData: Array<Event> = new Array<Event>(); //upcoming events that were volunteered for
  volunteers: Array<Volunteer> = new Array <Volunteer>(); //holds status values for the array

  get eventsFormArray() {
    return this.form.controls.events as FormArray;
  }

  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient) {
    this.form = this.formBuilder.group({
      SelectEvent: [''],
      events: new FormArray([])
    });
  }

  submit() {
    this.wellText = this.form.get('SelectEvent')?.value;
  }

  ngOnInit(): void {
    this.populateVolunteersAndEvents();
  }

  populateVolunteersAndEvents() {
    //get all of the EventIDs that this volunteer is volunteered to (includes cancelled)
    //get this user's id. If there is none in storage, send the invalid -1 id
    const userId = +(sessionStorage?.getItem("id") || '-1'); //convert to number
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
          //now that we have the event, add it to our list
          this.eventsData.push(event);
        }
      }, err => {
        window.alert(err.error.message);
      }); //end of http request
    } //end of for loop
  }

  Select(i: number) {
    //not sure if we will use this method
    this.wellText = this.eventsData[i].Description;
  }

  Attend(i: number) {
    //this method is called when the volunteer wants to attend a cancelled volunteer slot
    //we need to do some checking in order to ensure that there is space for the volunteer
    //to attend the event
    if (this.eventsData[i].VolunteerNeed >= 1) {
      //there is an open slot to volunteer
      const userId = +(sessionStorage?.getItem("id") || '-1'); //convert to number
      //we will use body to send data to the server
      var body = {
        UserId: userId,
        EventId: this.volunteers[i].EventID,
        Deleted: false,
        VolunteerNeed: this.eventsData[i].VolunteerNeed - 1 //add one back to the slot
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
              window.alert("Sucessfully volunteered for the event.")
              this.router.navigate(["Home"]);
            }
          }, err => {
            window.alert(err.body.message);
          }); //end of http events/volunteer request
        } //end of else
      }, err => {
        window.alert(err.body.message);
      }); //end of http volunteers/update request
    } else {
      //there is not enough room for the volunteer to attend
      window.alert("There are no available volunteer slots for this event.");
    }
  }

  Cancel(i: number) {
    //this method is called when a volunteer wants to cancel their volunteered slot
    //no checking is needed here, we only need to update the volunteers table and add 
    //a slot to the related event
    const userId = +(sessionStorage?.getItem("id") || '-1'); //convert to number
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
