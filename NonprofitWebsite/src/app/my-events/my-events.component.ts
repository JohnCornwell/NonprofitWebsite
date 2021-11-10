import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Event } from '../interfaces/Event';
import { Volunteers } from '../interfaces/Volunteers';
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.css']
})
export class MyEventsComponent implements OnInit {
  wellText: String = "Click an event to see the description.";
  form: FormGroup;
  eventsData: Array<Event> = new Array<Event>(); //upcoming events that were volunteered for
  volunteers: Array<Volunteers> = new Array <Volunteers>(); //holds status values for the array

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
        result.body.forEach((volunteers: Volunteers) => {
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
          console.log(result.body);
        }
      }, err => {
        window.alert(err.error.message);
      }); //end of http request
    } //end of for loop
  }

  Select(i: number) {
    this.wellText = this.eventsData[i].Description;
  }

  Attend(i: number) {

  }

  Cancel(i: number) {

  }

}
