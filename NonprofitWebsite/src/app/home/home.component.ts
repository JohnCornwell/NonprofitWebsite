import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { 
  FormBuilder, FormGroup, FormArray, FormControl
} from '@angular/forms';
import { Event } from '../interfaces/Event';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  wellText = "Select an event to see the description.";
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
