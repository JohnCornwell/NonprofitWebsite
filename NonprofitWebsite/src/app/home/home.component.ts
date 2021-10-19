import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray,
  FormControl, ValidatorFn
} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  form: FormGroup;
  ordersData = [
    { id: 100, name: 'order 1' },
    { id: 200, name: 'order 2' },
    { id: 300, name: 'order 3' },
    { id: 400, name: 'order 4' }
  ];

  get ordersFormArray() {
    return this.form.controls.orders as FormArray;
  }

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      orders: new FormArray([])
    });

    this.addCheckboxes();
  }

  private addCheckboxes() {
    this.ordersData.forEach(() => this.ordersFormArray.push(new FormControl(false)));
  }

  submit() {
    console.log("test");
  }

  ngOnInit(): void {
  }

}
