import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css']
})
export class EventEditComponent implements OnInit {

  ID: number = 0;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.ID = this.route.snapshot.params.id;
  }

}
