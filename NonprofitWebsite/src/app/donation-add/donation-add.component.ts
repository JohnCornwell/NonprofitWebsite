import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-donation-add',
  templateUrl: './donation-add.component.html',
  styleUrls: ['./donation-add.component.css']
})
export class DonationAddComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.form = this.fb.group({
      Type: ['', Validators.required],
      Amount: [0, [Validators.required, Validators.min(5)]],
      Description: ['']
    });
  }


  ngOnInit(): void {
  }

  onSubmit() {

  }
}
