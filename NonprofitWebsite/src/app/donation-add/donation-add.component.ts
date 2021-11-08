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
  /* This component is used by donors to make a restricted donation to
   * an Event, or make an unrestricted donation.
   */

  form: FormGroup;
  eventsData: Array<Event> = new Array<Event>();
  EventID: number = -1; //sentinel value to indicate unrestricted donation

  get eventsFormArray() {
    return this.form.controls.events as FormArray;
  }

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) {
    this.form = this.formBuilder.group({
      Amount: [0, [Validators.required, Validators.min(5)]],
      SelectEvent: [''],
      events: new FormArray([]),
      Description: ['']
    });
  }

  onSubmit() {
    let type: string;
    let today = new Date(); //creates a Date representing today
    let DonationGoal: number = 0;
    if (this.form.get('SelectEvent')?.value != '') {
      //there is an event selection, so this is a restricted donation
      this.EventID = this.form.get('SelectEvent')?.value;
      type = "Restricted"
      //subtract the donation from the DonationGoal of the Event we are donating to
      for (var i = 0; i < this.eventsData.length; i++) {
        if (this.eventsData[i].EventID == this.EventID) {
          DonationGoal = this.eventsData[i].DonationGoal - this.form.get("Amount")?.value;
        }
      }
    } else {
      this.EventID = -1;
      type = "Unrestricted";
    }

    /* This is the body for all http requests. It is possible some fileds will not
     * be used by the server
     */
    let body = {
      Type: type,
      Month: today.getMonth(),
      Day: today.getDay(),
      Year: today.getFullYear(),
      Amount: this.form.get('Amount')?.value,
      Description: this.form.get('Description')?.value,
      EventId: this.EventID,
      DonationGoal: DonationGoal,
      DonationId: 0
    }

    this.makeDonation(body);
  }

  makeDonation(body: {
    Type?: string; Month?: number; Day?: number; Year?: number;
    Amount?: any; Description?: any; EventId?: number; DonationGoal?: number; DonationId: any;
    }) {
    //send the donation to the server
    this.http.post<any>("/donation/create", body, { observe: "response" }).subscribe(result => {
      if (result.status != 200) {
        window.alert(result.body.message);
      } else {
        //donation was added, so modify other tables if necessary
        if (this.EventID != -1) {
          /* This is a restricted donation, so add an entry to the Needs
           * table and update the event by subtracting the donation from
           * the goal.
           */
          //our result contains the DonationID that we need to add to Needs
          console.log(result);
          body.DonationId = result.body.DonationID;
          this.http.post<any>("/needs/create", body, { observe: "response" }).subscribe(result => {
            if (result.status != 200) {
              //we will alert the user to an unexpected code
              window.alert(result.body.message);
            }
            //as long as we dont have an error code, we will modify the event table
            this.http.post<any>("/event/donate", body, { observe: "response" }).subscribe(result => {
              if (result.status != 200) {
                window.alert(result.body.message);
              } else {
              }
            }, err => {
              window.alert(err.error.message);
            });
          }, err => {
            window.alert(err.error.message + "\n Unable to modify the event, " +
                         "so this is an unrestricted donation.");
          });
        }
      }
      // all tables have been successfully modified
      window.alert("Thank you for your donation.");
      // we will go to the home page only on success codes (might not be 200)
      this.router.navigate(['/Home/donor']);
    }, err => {
      window.alert(err.error.message);
    });
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
