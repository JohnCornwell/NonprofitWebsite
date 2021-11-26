import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { 
  FormBuilder, FormGroup, FormArray, FormControl
} from '@angular/forms';
import { Router } from '@angular/router';
import { Event } from '../interfaces/Event';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  wellText: String = "Click on an event to see its description";
  form: FormGroup;
  eventsData: Array<Event> = new Array<Event>();

  get eventsFormArray() {
    return this.form.controls.events as FormArray;
  }

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) {
    this.form = this.formBuilder.group({
      SelectEvent: [''],
      events: new FormArray([])
    });
  }

  submit() {
    console.log("ID: " + this.form.get('SelectEvent')?.value);
    this.wellText = this.form.get('SelectEvent')?.value;
  }

  navigateToEventAdd() {
    this.router.navigate(['/Event/create']);
  }

  navigateToEventEdit() {
    this.router.navigate(['/Event/edit/' + this.form.get('SelectEvent')?.value]);
  }

  editEvent(ID: number){
    this.router.navigate(['/Event/edit/' + ID]);
  }

  ngOnInit(): void {
    this.http.get<any>("/event/list", { observe: "response" }).subscribe(result => {
      if (result.status != 200) {
        window.alert("Error in requesting event list from server.");
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
      }//end of else
     }, err => {
          window.alert(err.error.message);
        });
  }

  Select(i: number) {
    //used to update event description
    this.wellText = this.eventsData[i].Description;
  }

  Delete(i: number) {
    //Delete the given event only if it is in the future
  }

}
