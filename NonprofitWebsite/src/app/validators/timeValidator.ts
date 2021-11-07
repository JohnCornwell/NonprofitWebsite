import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export const invalidTimeValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  /* This validator is responsible for ensuring that the start time of a form is
   * before or equal to the end time for that form.
   */
  const startTime = control.get('Start');
  const endTime = control.get('End');
  if (startTime && endTime) {
    let sTime = startTime.value;
    let eTime = endTime.value;
    const startHour = sTime.toString().substring(0, 2);
    const startMin = sTime.toString().substring(3);
    const endHour = eTime.toString().substring(0, 2);
    const endMin = eTime.toString().substring(3);
    let sHour = parseInt(startHour);
    let sMin = parseInt(startMin);
    let eHour = parseInt(endHour);
    let eMin = parseInt(endMin);
    if (sHour > eHour) {
      //start is after end
      return { invalidTime: true };
    } else if (sHour == eHour && sMin >= eMin) {
      //start is the same or after end
      return { invalidTime: true };
    }
  }
  return null;
};
