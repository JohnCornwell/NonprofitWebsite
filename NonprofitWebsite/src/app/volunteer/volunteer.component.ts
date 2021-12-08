import { Event } from './../interfaces/Event';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Volunteer } from '../interfaces/Volunteer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-volunteer',
  templateUrl: './volunteer.component.html',
  styleUrls: ['./volunteer.component.css']
})
export class VolunteerComponent implements OnInit {
  //list of events that the user can volunteer for
  eventsList: Array<Event> = new Array<Event>();
  //copy of event list that will copy event list for display purposes
  displayList: Array<Event> = new Array<Event>();
  //list of events in the future that the user is volunteered for
  volunteeredEvents: Array<Event> = new Array<Event>();
  //map of links to cancelled volunteer slots. Indexed by EventID
  volunteersList: Map<number, Volunteer> = new Map();

  wellText: String = "Click on an event to see its description";

  constructor(private http: HttpClient, private router: Router) {

  }

  ngOnInit(): void {
    // Get list of all events that the user can volunteer for (in the future, not currently
    // attending, and has space).
    this.http.get<any>("/event/list", { observe: "response" }).subscribe(result => {
      if (result.status != 200) {
        window.alert("Error in requesting event list from server.");
      } else {
        //set up readable strings for every Event before adding it to the array for display
        result.body.forEach((event: Event) => {
          //date months are zero indexed
          let eventDate = new Date(event.Year, event.Month - 1, event.Day,0,0,0);
          let today = new Date(); //the current date
          //this is today without the current time
          let todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
          //only display events that are happening now or in the future and have space
          if (todayStart.valueOf() <= eventDate.valueOf() && event.VolunteerNeed > 0
            && event.Deleted == false) {
            //only add events that are happening today or in the future that have a positive
            //need and are not deleted
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
            //add event to the list
            this.eventsList.push(event);
          } //end of if
        }); //end of iterator
        // Get list of all events this user is a volunteer for
        //get all of the EventIDs that this volunteer is volunteered to (includes cancelled)
        //get this user's id. If there is none in storage, send the invalid -1 id
        const userId = +(sessionStorage?.getItem("id") || '-1'); //convert to number
        var body = {
          UserId: userId
        }
        this.http.post<any>("/volunteers/retrieveEvents", body, { observe: "response" }).subscribe(result => {
          if (result.status != 200) {
            window.alert(result.body.message + "Unable to find volunteer data.");
          } else {
            result.body.forEach((volunteers: Volunteer) => {
              //if the user is currently volunteering for an event, remove it
              if (volunteers.Deleted == false) {
                //this event is already volunteered for by the user
                var newEvents = new Array<Event>();
                //remove this event from the event display list and add it to the volunteered list
                for (var i = 0; i < this.eventsList.length; i++) {
                  if (this.eventsList[i].EventID == volunteers.EventID) {
                    //remove the conflict from the option list by not adding it to newEvents
                  } else {
                    //this is not the conflict, so add it to the new events display list
                    newEvents.push(this.eventsList[i]);
                  }
                } //end of iterator
                //update the events display list with the new list
                this.eventsList = new Array<Event>();
                for (var i = 0; i < newEvents.length; i++) {
                  this.eventsList.push(newEvents[i]);
                }
                newEvents = new Array<Event>();
                //add the conflict to the volunteeredEvents array
                this.populateVolunteerEvents(volunteers.EventID);
              } else {
                //we need to update this entry if the user volunteers for the associated event
                this.volunteersList.set(volunteers.EventID, volunteers);
              }
            }); //end of iterator
          }
        }, err => {
          window.alert(err.error.message);
        }); //end of http volunteers/retrieveEvents request
      }//end of else
    }, err => {
      window.alert(err.error.message);
    });
    this.displayList = this.eventsList; //copy events to be displayed (done for UX effect)
  }

  populateVolunteerEvents(EventId: number) {
    //get the event from the server that this user has volunteered for
    var body = {
      EventId: EventId
    }
    this.http.post<any>("/event/retrieveById", body, { observe: "response" }).subscribe(result => {
      if (result.status != 200) {
        window.alert(result.body.message + "Unable to find volunteeed event.");
      } else {
        result.body.forEach((event: Event) => {
          //there should only be one event returned
          this.volunteeredEvents.push(event);
        });
      }
    }, err => {
      window.alert(err.body.message);
    });
  }

  Select(i: number) {
    //user has clicked on an event row
    this.wellText = this.eventsList[i].Description;
  }

  Volunteer(i: number) {
    //user has requested to volunteer for an event. Since we have displayed
    //events in the future with space, we only need to check that there is
    //not a scheduling conflict
    var myEvent: Event = this.eventsList[i]; //the event we want to volunteer for
    var conflict: boolean = false; //indicates a conflict with a volunteered event
    this.volunteeredEvents.forEach((event: Event) => {
      //check for conflicting times with events the user has already volunteered for
      //date months are zero indexed
      var myStartTime = new Date(myEvent.Year, myEvent.Month - 1, myEvent.Day, myEvent.StartHour, myEvent.StartMinute);
      var myEndTime = new Date(myEvent.Year, myEvent.Month - 1, myEvent.Day, myEvent.EndHour, myEvent.EndMinute);
      var eventStartTime = new Date(event.Year, event.Month - 1, event.Day, event.StartHour, event.StartMinute);
      var eventEndTime = new Date(event.Year, event.Month - 1, event.Day, event.EndHour, event.EndMinute);
      if (event.Deleted == true || myStartTime.valueOf() > eventEndTime.valueOf() || myEndTime.valueOf() < eventStartTime.valueOf()) {
        //my event starts after or at the end of event or my event ends before or at event start
      } else {
        //this is a conflict
        conflict = true;
      }
    }); //end of iterator
    //only reachable by events that do not have a scheduling conflict
    //check if the user has a concelled volunteers table entry befre creating a new one
    if (conflict) {
      window.alert("Cannot volunteer due to scheduling conflicts with a " +
        "previoulsy volunteered event.");
    } else {
      //see if there is a cancelled volunteers entry
      let entry: any = this.volunteersList.get(myEvent.EventID);
      const userId = +(sessionStorage?.getItem("id") || '-1'); //convert to number
      //we will use body to send data to the server
      var body = {
        UserId: userId,
        EventId: myEvent.EventID,
        Deleted: false,
        VolunteerNeed: myEvent.VolunteerNeed -1 //new volunteer need after this slot is taken
      }
      if (entry == undefined) {
        //make a new volunteer entry and update the event
        this.http.post<any>("volunteers/create", body, { observe: "response" }).subscribe(result => {
          if (result.status != 200) {
            window.alert(result.body.message + "Unable to update volunteer data.");
          } else {
            //successfully created the volunteers entry, so update the event
            this.http.post<any>("event/volunteer", body, { observe: "response" }).subscribe(result => {
              if (result.status != 200) {
                window.alert(result.body.message + "Unable to update event data.");
              } else {
                //we have sucessfully cancelled the volunteer slot
                window.alert("Sucessfully volunteered.")
                this.router.navigate(["/Home"]);
              }
            }, err => {
              window.alert(err.body.message);
            }); //end of http events/volunteer request
          } //end of else
        }, err => {
          window.alert(err.message);
        }); //end of http volunteers/create request
      } else {
        //update the existing volunteers entry and event
        this.http.post<any>("volunteers/update", body, { observe: "response" }).subscribe(result => {
          if (result.status != 200) {
            window.alert(result.body.message + "Unable to update volunteer data.");
          } else {
            //successfully updated the volunteers table, so update the event
            this.http.post<any>("event/volunteer", body, { observe: "response" }).subscribe(result => {
              if (result.status != 200) {
                window.alert(result.body.message + "Unable to update event data.");
              } else {
                //we have sucessfully cancelled the volunteer slot
                window.alert("Sucessfully volunteered.")
                this.router.navigate(["Home"]);
              }
            }, err => {
              window.alert(err.body.message);
            }); //end of http events/volunteer request
          } //end of else
        }, err => {
          window.alert(err.message);
        }); //end of http volunteers/create request
      } //end of else entry not undefined
    } //end of else no conflict
  }
}
