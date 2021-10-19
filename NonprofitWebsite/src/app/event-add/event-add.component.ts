import { Component, OnInit } from '@angular/core';
import {
  FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { EventsService } from '../events.service';

@Component({
  selector: 'app-event-add',
  templateUrl: './event-add.component.html',
  styleUrls: ['./event-add.component.css']
})
export class EventAddComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder, private es: EventsService) {
    this.form = this.fb.group({
      EventName: ['', Validators.required],
      MorningNeed: [0, [Validators.required, Validators.min(0)]],
      AfternoonNeed: [0, [Validators.required, Validators.min(0)]],
      NightNeed: [0, [Validators.required, Validators.min(0)]],
      date: [new Date(), [Validators.required, forbiddenDateValidator()]],
      Start: ['09:00', Validators.required],
      End: ['17:00', Validators.required],
      Description: ['']
    }, { validators: invalidTimeValidator });
  }

  
  ngOnInit(): void {
  }

  onSubmit() {
    this.es.addEvent(this.form.get('EventName')?.value, this.form.get('MorningNeed')?.value,
      this.form.get('AfternoonNeed')?.value, this.form.get('NightNeed')?.value,
      this.form.get('date')?.value, this.form.get('Start')?.value, this.form.get('End')?.value,
      this.form.get('Description')?.value);
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
;
const invalidTimeValidator(): ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const startTime = control.get('Start');
    const endTime = control.get('End');
    console.log("Validate");
    if (startTime && endTime) {
      console.log("In conditional");
      const sTime:string = startTime.value; //string hh:mm
      const eTime:string = endTime.value;  //string hh:mm
      const startHour = sTime.substring(0, 2);
      const startMin = sTime.substring(3);
      let sHour = parseInt(startHour);
      let sMin = parseInt(startMin);
      const endHour = eTime.substring(0, 2);
      const endMin = eTime.substring(3);
      let eHour = parseInt(endHour);
      let eMin = parseInt(endMin);
      console.log(sTime + " " + eTime);
      if (sHour > eHour) {
        //start is after end
        return { forbiddenDate: { value: true } };
      } else if (sHour == eHour && sMin >= eMin) {
        //start is the same or after end
        return { forbiddenDate: { value: true } };
      }
    }
    return null;
  }
};
