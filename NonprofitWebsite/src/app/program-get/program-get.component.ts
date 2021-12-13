import { Component, OnInit } from '@angular/core';
import Event from '../Event';

/*
 * This is a partially completed page to display info for a
 * program to any user.
 */

@Component({
  selector: 'app-program-get',
  templateUrl: './program-get.component.html',
  styleUrls: ['./program-get.component.css']
})
export class ProgramGetComponent implements OnInit {

  ProgId: number;
  Name: string;
  About: string;
  Events: Event[];

  constructor() {
    if (localStorage.ProgId) {
      this.ProgId = localStorage.OrgId;
    } else {
      this.ProgId = -1;
    }
    if (localStorage.Name) {
      this.Name = localStorage.Name;
    } else {
      this.Name = '';
    }
    if (localStorage.About) {
      this.About = localStorage.About;
    } else {
      this.About = '';
    }
    // set this to the query of hosted events by this program
    this.Events = [];
  }

  ngOnInit(): void {
  }

}
