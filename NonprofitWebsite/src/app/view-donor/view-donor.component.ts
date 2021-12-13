import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Donation } from '../interfaces/Donation';
import { Needs } from '../interfaces/Needs';
import { Donates } from '../interfaces/Donates';
import { Event } from '../interfaces/Event';
import { User } from '../interfaces/User';

/*
 * This page is used by an admin to view details about a donor. This page
 * provided the admin with a detailed report about donations made by the
 * donor along with functionality to delete or renew the donor.
 */

@Component({
  selector: 'app-view-donor',
  templateUrl: './view-donor.component.html',
  styleUrls: ['./view-donor.component.css']
})
export class ViewDonorComponent implements OnInit {

  form: FormGroup;
  //initialize to an invalid user
  ID = -1; //this is the id given in the url
  myUser: User = {
    UserID: -1, Username: 'donor', FirstName: '', MiddleName: '',
    LastName: '', UserType: '', Deleted: false
  };
  donationData: Array<Donation> = new Array<Donation>(); //list of donations made by the donor
  donates: Array<Donates> = new Array<Donates>(); //holds id of the donatins made by the donor
  totalDonated = 0;
  totalEvents = 0;
  totalOrg = 0;

  get eventsFormArray() {
    return this.form.controls.events as FormArray;
  }

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private router: Router, private http: HttpClient) {
    this.form = this.formBuilder.group({
      SelectEvent: [''],
      events: new FormArray([])
    });
  }

  ngOnInit(): void {
    this.ID = this.route.snapshot.params?.id;
    if (this.ID != undefined) {
      //there exists a UserID to check for
      this.getUser()
      //if getUser finds a user, it will populate the arrays
    }
  }

  getUser() {
    //get the user that was given in the url
    var body = {
      UserId: this.ID
    }
    this.http.post<any>("/user/retrieveById", body, { observe: "response" }).subscribe(result => {
      if (result.status != 200) {
        window.alert("Unable to retrieve user info.");
        this.router.navigate(['/Users']);
      } else {
        this.myUser = {
          UserID: result.body[0].UserID,
          Username: result.body[0].Username,
          FirstName: result.body[0].FirstName,
          MiddleName: result.body[0].MiddleName,
          LastName: result.body[0].LastName,
          UserType: result.body[0].UserType,
          Deleted: result.body[0].Deleted
        };
        //now that we have a valid user, get its relevant data
        this.populateArrays();
      }
    }, err => {
      window.alert(err.error.message);
      this.router.navigate(['/Users']);
    });
  }

  populateArrays() {
    //get all of the DonationIDs related to this user. Then find all of the Donations with
    //those ids. For the restricted donations, find the event that they are associated with.
    const userId = this.myUser.UserID; //convert to number
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
          //add donation amount to the appropriate totals
          this.totalDonated += donation.Amount;
          //if this is a restricted donation, we need the event that was donated to
          if (donation.Type == "Restricted") {
            this.findEvent(donation);
            this.totalEvents += donation.Amount;
          } else {
            this.totalOrg += donation.Amount;
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

  Renew() {
    //this method is called when this user is deleted and the admin clicks Renew
    var body = {
      UserId: this.myUser.UserID,
      Deleted: false
    }
    this.http.post<any>("/user/delete", body, { observe: "response" }).subscribe(result => {
      if (result.status != 200) {
        window.alert("Unable to renew user.");
      } else {
        window.alert("Successfully renewed user.");
        this.router.navigate(['/Users']);
      }
    }, err => {
      window.alert(err.error.message);
    });
  }

  Delete() {
    //this method is called when this user is active and the admin clicks Delete
    var body = {
      UserId: this.myUser.UserID,
      Deleted: true
    }
    this.http.post<any>("/user/delete", body, { observe: "response" }).subscribe(result => {
      if (result.status != 200) {
        window.alert("Unable to delete user.");
      } else {
        window.alert("Successfully deleted user.");
        this.router.navigate(['/Users']);
      }
    }, err => {
      window.alert(err.error.message);
    });
  }
}
