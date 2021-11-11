import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable} from 'rxjs';
import { UserServiceService } from './user-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'NonprofitWebsite';

  type: Observable<any>; //sends type of user logged into the system

  userService: UserServiceService;

  //make constructor that takes in a user service
  constructor(userService: UserServiceService, private router: Router) {
    this.type = userService.currentType;
    this.userService = userService;
  }

  routeButton(route: String) {
    this.router.navigate([route]);
  }

  logout() {
    this.userService.logout();
  }
}
