import { Component, OnInit } from '@angular/core';
import {
  FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { invalidTimeValidator } from '../validators/timeValidator';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

/*
 * This file implements a form for an admin to add a new event to
 * the database. The event must have a start date after tomorrow,
 * a start time before its end time, and at least one required
 * volunteer. The unique event name constraint will be enforced
 * by the server.
 */

@Component({
  selector: 'app-event-add',
  templateUrl: './event-add.component.html',
  styleUrls: ['./event-add.component.css']
})
export class EventAddComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.form = this.fb.group({
      EventName: ['', Validators.required],
      VolunteerNeed: [0, [Validators.required, Validators.min(0)]],
      DonationGoal: [0, [Validators.required, Validators.min(0)]],
      date: [new Date(), [Validators.required, forbiddenDateValidator()]],
      Start: ['09:00', Validators.required],
      End: ['17:00', Validators.required],
      Description: ['']
    }, { validators: invalidTimeValidator });
  }


  ngOnInit(): void {
  }

  onSubmit() {
    //collect validated data from form and attempt to add it to the database
    const date: Date = new Date(this.form.get('date')?.value);
    const month: number = date.getMonth() + 1;
    const day: number = date.getDate() + 1;
    const year: number = date.getFullYear()
    const startHour: number = parseInt(this.form.get('Start')?.value.substring(0, 2));
    const startMin: number = parseInt(this.form.get('Start')?.value.substring(3));
    const endHour: number = parseInt(this.form.get('End')?.value.substring(0, 2));
    const endMin: number = parseInt(this.form.get('End')?.value.substring(3));


    this.addEvent(this.form.get('EventName')?.value, this.form.get('VolunteerNeed')?.value,
      this.form.get('DonationGoal')?.value, month, day, year, startHour, startMin, endHour, endMin,
      this.form.get('Description')?.value);
  }

  addEvent(EventName: String, VolunteerNeed: number, DonationGoal: number,
    Month: number, Day: number, Year: number, StartHour: number,
    StartMinute: number, EndHour: number, EndMinute: number, Description: String) {

    // body of the http post request we will send to the server
    var body = {
      EventName: EventName,
      VolunteerNeed: VolunteerNeed ,
      DonationGoal: DonationGoal,
      Month: Month,
      Day: Day,
      Year: Year,
      StartHour: StartHour,
      StartMinute: StartMinute,
      EndHour: EndHour,
      EndMinute: EndMinute,
      Description: Description
    }
    //the result of a successful post will have a 201 status
    this.http.post<any>("/event/create", body, { observe: "response" }).subscribe(result => {
      if (result.status != 200) {
        window.alert(result.body.message);
      } else {
        window.alert("Event added.");
      }
      this.router.navigate(['/Home']);
    }, err => {
      window.alert(err.error.message);
    });
  }
}

/* Date must be tomorrow or in the future */
function forbiddenDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const tomorrow = new Date();
    const input: Date = new Date(control.value);
    return input.getTime() < tomorrow.getTime() ? { forbiddenDate: { value: control.value } } : null;
  };
}
