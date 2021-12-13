import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

/*
 * This is an unimplemented file that is meant to allow an
 * admin to update event details.
 */

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css']
})
export class EventEditComponent implements OnInit {

  ID: number = 0;
  HasID: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.ID = this.route.snapshot.params?.id;
    if(this.ID != undefined){
      this.HasID = true;
    }
  }

  navigateToAdminHome() {
    this.router.navigate(['/Home/admin']);
  }

}
