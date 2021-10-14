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

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      EventName: ['', Validators.required],
      MorningNeed: [0, [Validators.required, Validators.min(0)]],
      AfternoonNeed: [0, [Validators.required, Validators.min(0)]],
      NightNeed: [0, [Validators.required, Validators.min(0)]],
      date: [new Date(), [Validators.required, forbiddenDateValidator()]],
      Start: [new Date(0, 0, 0, 0, 0, 0), Validators.required],
      End: [new Date(0, 0, 0, 0, 0, 0), Validators.required],
      Description: ['']
    }, { validators: invalidTimeValidator() });
  }

  
  ngOnInit(): void {
  }

  onSubmit() {
    this.addEvent(this.form.get('EventName')?.value, this.form.get('MorningNeed')?.value,
      this.form.get('AfternoonNeed')?.value, this.form.get('NightNeed')?.value,
      this.form.get('date')?.value, this.form.get('Start')?.value, this.form.get('End')?.value,
      this.form.get('Description')?.value);
  }

  addEvent(EventName: String, MorningNeed: number, AfternoonNeed: number,
    NightNeed: number, date: Date, Start: Date, End: Date, Description: String) {

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

/* End cannot be before Start */
function invalidTimeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const sTime = control.get('Start')?.value;
    const eTime = control.get('End')?.value;
    const start = new Date(sTime);
    const end = new Date(eTime);
    return start.getTime() > end.getTime() ? { forbiddenTime: { value: true } } : null;
  };
}