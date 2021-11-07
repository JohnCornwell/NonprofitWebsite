import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Event } from '../interfaces/Event';
import { Router } from '@angular/router';

@Component({
  selector: 'app-donation-add',
  templateUrl: './donation-add.component.html',
  styleUrls: ['./donation-add.component.css']
})
export class DonationAddComponent implements OnInit {

  form: FormGroup;
  eventsData: Array<Event> = new Array<Event>();
  EventID: number = -1;

  get eventsFormArray() {
    return this.form.controls.events as FormArray;
  }

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.form = this.formBuilder.group({
      Amount: [0, [Validators.required, Validators.min(5)]],
      SelectEvent: [''],
      events: new FormArray([]),
      Description: ['']
    });
  }

  onSubmit() {
    if (this.form.get('SelectEvent')?.value != null) {
      this.EventID = this.form.get('SelectEvent')?.value;
    } else {
      this.EventID = -1;
    }
    var body{
      EventID: EventID,
      Description: this.form.get('Description')
    }
  }

  ngOnInit(): void {
    this.http.get<any>("/event/list", { observe: "response" }).subscribe(result => {
      if (result.status != 200) {
        window.alert("Error in requesting event list from server.");
      } else {
        console.log(result.body);
        result.body.forEach(() => this.eventsFormArray.push(new FormControl()));
        this.eventsFormArray.push(new FormControl())
        this.eventsData = result.body;
      }
    }, err => {
      window.alert(err.error.message);
    });
  }
}
