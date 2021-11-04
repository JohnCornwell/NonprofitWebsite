import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { 
  FormBuilder, FormGroup, FormArray, FormControl
} from '@angular/forms';

interface Event {
  EventID: Number,
  Name: String,
  MorningNeed: Number,
  AfternoonNeed: Number
  NightNeed: Number,
  Month: Number,
  Day: Number,
  Year: Number,
  StartHour: Number,
  StartMinute: Number,
  EndHour: Number,
  EndMinute: Number,
  Description: String
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  wellText = "Event Description";
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
    console.log(this.form.get('SelectEvent')?.value);
    this.wellText = this.form.get('SelectEvent')?.value;
  }

  ngOnInit(): void {
    this.http.get<any>("/event/list", { observe: "response" }).subscribe(result => {
      if (result.status != 200) {
        window.alert("Error in requesting event list from server.");
      } else {
        console.log(result.body);
        result.body.forEach(() => this.eventsFormArray.push(new FormControl()));
        this.eventsData = result.body;
      }
    });
  }
}
