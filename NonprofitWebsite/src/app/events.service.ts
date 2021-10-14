import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  uri = 'http://localhost:4000/products';

  constructor(private http: HttpClient) { }

  addProduct(EventName: String, MorningNeed: number, AfternoonNeed: number,
    NightNeed: number, date: Date, Start: Date, End: Date, Description: String) {
    const obj = {
      EventName,
      MorningNeed,
      AfternoonNeed,
      NightNeed,
      date,
      Start,
      End,
      Description
    };
    console.log(obj);
    this.http.post(`${this.uri}/add`, obj)
      .subscribe(res => console.log('Done'));
  }
}
