import { Component, OnInit } from '@angular/core';
import Event from '../Event';

@Component({
  selector: 'app-organization-get',
  templateUrl: './organization-get.component.html',
  styleUrls: ['./organization-get.component.css']
})
export class OrganizationGetComponent implements OnInit {

  orgId: number;
  Name: string;
  Description: string;
  Events: Event[];

  constructor() {
    if (localStorage.OrgId) {
      this.orgId = localStorage.OrgId;
    }else {
      this.orgId = -1;
    }
    if (localStorage.Name) {
      this.Name = localStorage.Name;
    } else {
      this.Name = '';
    }
    if (localStorage.Name) {
      this.Description = localStorage.Description;
    } else {
      this.Description = '';
    }
    // set this to the query of hosted events by this organization
    this.Events = [];
  }

  ngOnInit(): void {
  }

}
