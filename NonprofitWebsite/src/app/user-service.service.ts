import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject} from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  /* This service is responsible for recording and broadcasting the
   * type of user that is logged into the system.
   */

  private currentTypeSubject: BehaviorSubject<String>;
  public currentType: Observable<String>;

  constructor(private router: Router) {
    this.currentTypeSubject = new BehaviorSubject<String>("none");
    this.currentType = this.currentTypeSubject.asObservable();
    console.log("User Service constructor called");
  }

  login(type: String) {
    this.currentTypeSubject.next(type);
  }

  logout() {
    this.currentTypeSubject.next("none");
    this.router.navigate(['Home']);
  }
}
