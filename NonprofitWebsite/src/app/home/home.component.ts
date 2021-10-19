import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray,
  FormControl, ValidatorFn
} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  showWell = false;
  wellText = "";
  form: FormGroup;
  eventsData = [
    { id: 100, name: 'event 1', description: 'test description 1' },
    { id: 200, name: 'event 2', description: 'test description 2' },
    { id: 300, name: 'event 3', description: 'test description 3' },
    { id: 400, name: 'event 4', description: 'test description 4' }
  ];

  get eventsFormArray() {
    return this.form.controls.events as FormArray;
  }

  constructor(private formBuilder: FormBuilder) {
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
    this.showWell = true;
  }

  ngOnInit(): void {
  }

}
