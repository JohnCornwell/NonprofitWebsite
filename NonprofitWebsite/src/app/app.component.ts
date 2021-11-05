import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { UserServiceService } from './user-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'NonprofitWebsite';

  type: Observable<any>; //sends type of user logged into the system

  //make constructor that takes in a user service
  constructor(userService: UserServiceService) {
    this.type = userService.currentType;
  }
}
