import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-event-add',
  templateUrl: './event-add.component.html',
  styleUrls: ['./event-add.component.css']
})
export class EventAddComponent implements OnInit {

  form!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

createForm(){
  this.form = this.fb.group({
    ProductName: ['', Validators.required],
    ProductDescription: ['', Validators.required],
    ProductPrice: ['', Validators.required]
  });
}

  ngOnInit(): void {
  }
}
