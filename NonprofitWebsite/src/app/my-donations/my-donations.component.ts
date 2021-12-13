import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Donation } from '../interfaces/Donation';
import { Needs } from '../interfaces/Needs';
import { Donates } from '../interfaces/Donates';
import { Event } from '../interfaces/Event';

/*
 * This file implements a donations page that displays all donations
 * made by a logged in donor.
 */

@Component({
  selector: 'app-my-donations',
  templateUrl: './my-donations.component.html',
  styleUrls: ['./my-donations.component.css']
})
export class MyDonationsComponent implements OnInit {

  wellText: String = "Click on a donation to see its description.";
  form: FormGroup;
  donationData: Array<Donation> = new Array<Donation>(); //list of donations made by the donor
  donates: Array<Donates> = new Array<Donates>(); //holds id of the donatins made by the donor

  get eventsFormArray() {
    return this.form.controls.events as FormArray;
  }

  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient) {
    this.form = this.formBuilder.group({
      SelectEvent: [''],
      events: new FormArray([])
    });
  }

  ngOnInit(): void {
    this.populateArrays();
  }

  populateArrays() {
    //get all of the DonationIDs related to this user. Then find all of the Donations with
    //those ids. For the restricted donations, find the event that they are associated with.
    const userId = +(sessionStorage?.getItem("id") || '-1'); //convert to number
    var body = {
      UserId: userId
    }
    this.http.post<any>("/donates/retrieveDonations", body, { observe: "response" }).subscribe(result => {
      if (result.status != 200) {
        window.alert(result.body.message + "Unable to find any donations.");
      } else {
        result.body.forEach((donates: Donates) => {
          this.donates.push(donates);
        }); //end of iterator
        //now that we have all of the DonationIDs, find the donations
        this.populateDonations();
      }
    }, err => {
      window.alert(err.error.message);
    });
  }

  populateDonations() {
    //based on the DonationIDs in the donates list, get the donations with those ids.
    for (var i = 0; i < this.donates.length; i++) {
      //collect the id for the query
      var body = {
        DonationId: this.donates[i].DonationID
      }
      //make the request
      this.http.post<any>("/donation/retrieve", body, { observe: "response" }).subscribe(result => {
        if (result.status != 200) {
          window.alert(result.body.message + "Unable to retrieve donation data.");
        } else {
          //we have a donation, so pair it with the donates entry
          var donation: Donation = result.body[0];
          let m: String = donation.Month.toString(10);
          let d: String = donation.Day.toString(10);
          if (m.length == 1) {
            m = '0' + m;
          }
          if (d.length == 1) {
            d = '0' + d;
          }
          donation.MonthString = m;
          donation.DayString = d;
          donation.YearString = donation.Year.toString(10);
          donation.EventName = "--"; //default string for unrestricted
          //now that we have the donation, add it to our list
          this.donationData.push(donation);
          //if this is a restricted donation, we need the event that was donated to
          if (donation.Type == "Restricted") {
            this.findEvent(donation)
          }
        }
      }, err => {
        window.alert(err.error.message);
      }); //end of http request
    } //end of for loop
  }

  findEvent(donation: Donation) {
    //we have a restricted donation, so find its event, and set the EventName
    var body = {
      DonationId: donation.DonationID
    }
    //get the EventID associated with this donation
    this.http.post<any>('needs/retrieveEvents', body, { observe: "response" }).subscribe(result => {
      if (result.status != 200) {
        window.alert(result.body.message + "Unable to retrieve event data.");
      } else {
        //we have an EventID, so retrieve the event
        var needs: Needs = result.body[0];
        var body2 = {
          EventId: needs.EventID
        }
        //request the event with this id
        this.http.post<any>('event/retrieveById', body2, { observe: "response" }).subscribe(result => {
          if (result.status != 200) {
            window.alert(result.body.message + "Unable to retrieve event data.");
          } else {
            var event: Event = result.body[0];
            //we have an event, so update the donation
            donation.EventName = event.Name;
          }
        }, err => {
          window.alert(err.error.message);
        }); //end of event/retrieveById http request
      }
    }, err => {
      window.alert(err.error.message);
    }); //end of http needs/retrieveEvents request
  }

  Select(i: number) {
    this.wellText = this.donationData[i].Description;
  }
}
