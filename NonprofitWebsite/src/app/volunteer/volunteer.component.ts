import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Event } from '../interfaces/Event';
import { Volunteer } from '../interfaces/Volunteer';

@Component({
  selector: 'app-volunteer',
  templateUrl: './volunteer.component.html',
  styleUrls: ['./volunteer.component.css']
})
export class VolunteerComponent implements OnInit {
  eventsList: Array<Event> = new Array<Event>();
  volunteersList: Array<Volunteer> = new Array<Volunteer>();

  constructor(private http: HttpClient) { 

  }

  volunteer(ID: Number)
  {
    console.log("Volunteer for "+ ID);
    var body = {
      UserId: Number(sessionStorage.getItem("id")),
      EventId: ID,
      Deleted: false
    }

    this.http.post<any>("/volunteers/create", body, { observe: "response" }).subscribe(result => {
      if (result.status != 200) {
        window.alert("Error in posting new volunteer entry.");
      } else {
        console.log(result.body);
      }
    }, err => {
      window.alert(err.error.message);
    });
  }

  unvolunteer(ID: Number)
  {
    console.log("UnVolunteer for "+ ID);
    var body = {
      UserId: Number(sessionStorage.getItem("id")),
      EventId: ID,
      Deleted: true
    }

    this.http.post<any>("/volunteers/update", body, { observe: "response" }).subscribe(result => {
      if (result.status != 200) {
        window.alert("Error in posting new volunteer entry.");
      } else {
        console.log(result.body);
      }
    }, err => {
      window.alert(err.error.message);
    });
  }

  ngOnInit(): void {
    // Get list of all events
    console.log("ID: " + sessionStorage.getItem("id"));
    this.http.get<any>("/event/list", { observe: "response" }).subscribe(result => {
      if (result.status != 200) {
        window.alert("Error in requesting event list from server.");
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
         this.eventsList.push(event);
      }
    }, err => {
      window.alert(err.error.message);
    });

    // Get list of all events this user is a volunteer for
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
        console.log(result.body);
        this.volunteersList = result.body;
      }
    }, err => {
      window.alert(err.error.message);
    });
  }

  checkVolunteered(ID: number){
    let returnVal: boolean = false;
    this.volunteersList.forEach(element => {
      if (element.EventID === ID && !element.Deleted){
        returnVal = true;
      }
    });
    console.log("ID: " + ID + "RET: " + returnVal);
    return returnVal;
  }

}
