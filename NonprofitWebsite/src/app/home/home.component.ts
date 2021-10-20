import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray,
  FormControl, ValidatorFn
} from '@angular/forms';
import { Observable } from 'rxjs';

interface Event {
  EventId: String,
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
  eventsData = [
    { id: 100, name: 'event 1', description: 'test description 1' },
    { id: 200, name: 'event 2', description: 'test description 2' },
    { id: 300, name: 'event 3', description: 'test description 3' },
    { id: 400, name: 'event 4', description: 'test description 4' }
  ];
  events$: Observable<Event[]> = new Observable();

  get eventsFormArray() {
    return this.form.controls.events as FormArray;
  }

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.form = this.formBuilder.group({
      SelectEvent: [''],
      events: new FormArray([])
    });

    this.addEvents();
  }

  private addEvents() {
    this.eventsData.forEach(() => this.eventsFormArray.push(new FormControl()));
  }

  submit() {
    console.log(this.form.get('SelectEvent')?.value);
    this.wellText = this.form.get('SelectEvent')?.value;
  }

  

  ngOnInit(): void {
    this.events$ = this.http
      .get<Event[]>('localhost:8000/event/list');

    //let resp = this.http.get('localhost:8000/event/list');
    console.log(this.events$);
  }

}
