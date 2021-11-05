import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private currentTypeSubject: BehaviorSubject<String>;
  public currentType: Observable<String>;

  constructor() {
    this.currentTypeSubject = new BehaviorSubject<String>("none");
    this.currentType = this.currentTypeSubject.asObservable();
  }

  public get currentTypeValue(): String {
    return this.currentTypeSubject.value;
  }

  login(type: String): Observable<String> {
    this.currentTypeSubject.next(type);
    return this.currentType;
  }

  logout() {
    this.currentTypeSubject.next("none");
    return this.currentType;
  }








  private subject = new Subject<any>();

  sendType(type: String) {
    this.subject.next(type);
  }

  getType(): Observable<any> {
    return this.subject.asObservable();
  }
}
