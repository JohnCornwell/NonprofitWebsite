import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Event } from '../interfaces/Event';

@Component({
  selector: 'app-donor-home',
  templateUrl: './donor-home.component.html',
  styleUrls: ['./donor-home.component.css']
})
export class DonorHomeComponent implements OnInit {
  wellText: String = "Click an event to see the description.";
  form: FormGroup;
  eventsData: Array<Event> = new Array<Event>();

  get eventsFormArray() {
    return this.form.controls.events as FormArray;
  }

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.form = this.formBuilder.group({
      SelectEvent: [''],
      events: new FormArray([])
    });
  }

  submit() {
    this.wellText = this.form.get('SelectEvent')?.value;
  }

  ngOnInit(): void {
    this.http.get<any>("/event/list", { observe: "response" }).subscribe(result => {
      if (result.status != 200) {
        window.alert(result.body.message + "Unable to display event data.");
      } else {
        //set up readable strings for every Event before adding it to the array for display
        result.body.forEach((event: Event) => {
          let eventDate = new Date(event.Year, event.Month, event.Day);
          let today = new Date(); //the current date
          let todayStart = new Date(today.getDate()); //this is today without the current time
          //only display events that are happening now or in the future
          if (todayStart.getTime() <= eventDate.getTime()) {
            //only add dates that are for today or the future
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
            this.eventsData.push(event);
            //space for the event in the dropdown
            this.eventsFormArray.push(new FormControl());
          } //end of if
        }); //end of iterator
      }
    }, err => {
      window.alert(err.error.message);
    });
  }

  Select(i: number) {
    this.wellText = this.eventsData[i].Description;
  }

}
