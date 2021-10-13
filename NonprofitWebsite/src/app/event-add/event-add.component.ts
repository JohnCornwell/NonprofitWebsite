import { Component, OnInit } from '@angular/core';
import {
  FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl,
  ValidationErrors
} from '@angular/forms';

@Component({
  selector: 'app-event-add',
  templateUrl: './event-add.component.html',
  styleUrls: ['./event-add.component.css']
})
export class EventAddComponent implements OnInit {

  form!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  //this assumes that this page is displayed after selecting an
  //existing organization on the organization display page
  createForm(){
    this.form = this.fb.group({
    EventName: ['', Validators.required],
    MorningNeed: [0, Validators.required, Validators.min(0)],
    AfternoonNeed: [0, Validators.required, Validators.min(0)],
    NightNeed: [0, Validators.required, Validators.min(0)],
    date: [new Date(), Validators.required, forbiddenDateValidator],
    Start: [new Date(0, 0, 0, 0, 0, 0), Validators.required],
    End: [new Date(0, 0, 0, 0, 0, 0), Validators.required],
    Description: ['']
    }, {validators: invalidTimeValidator});
}
  
  ngOnInit(): void {
  }
}

/* dates are invalid if they are within 24 hours of now */
export function forbiddenDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return control.value.getTime() < tomorrow.getTime() ? { forbiddenDate: { value: control.value } } : null;
  };
}

/* End cannot be before Start */
export function invalidTimeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const sTime = control.get('Start')?.value;
    const eTime = control.get('End')?.value;
    const start = new Date(sTime);
    const end = new Date(eTime);
    return start.getTime() > end.getTime() ? { forbiddenTime: {value: true} } : null;
  };
}
