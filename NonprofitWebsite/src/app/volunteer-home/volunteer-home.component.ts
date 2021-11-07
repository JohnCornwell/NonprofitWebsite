import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Event } from '../interfaces/Event';

@Component({
  selector: 'app-volunteer-home',
  templateUrl: './volunteer-home.component.html',
  styleUrls: ['./volunteer-home.component.css']
})
export class VolunteerHomeComponent implements OnInit {
  eventsList: Array<Event> = new Array<Event>();

  constructor(private http: HttpClient) { 

  }

  buttonPress(ID: Number){
    console.log("Volunteer for "+ ID);
    this.volunteer(ID);
  }

  volunteer(ID: Number)
  {
    var body = {
      UserId: Number(sessionStorage.getItem("id"))
    }
  }

  ngOnInit(): void {
    console.log("ID: " + sessionStorage.getItem("id"));
    this.http.get<any>("/event/list", { observe: "response" }).subscribe(result => {
      if (result.status != 200) {
        window.alert("Error in requesting event list from server.");
      } else {
        this.eventsList = result.body;
      }
    }, err => {
      window.alert(err.error.message);
    });
    var body = {
      UserId: Number(sessionStorage.getItem("id"))
    }
    console.log("User id is " + body.UserId);
    console.log(body);
    this.http.post<any>("/volunteers/retrieveEvents", body, { observe: "response" }).subscribe(result => {
      if (result.status != 200) {
        window.alert("Error in requesting volunteers list from server.");
      } else {
        console.log(result.body);
      }
    }, err => {
      window.alert(err.error.message);
    });
  }

}
