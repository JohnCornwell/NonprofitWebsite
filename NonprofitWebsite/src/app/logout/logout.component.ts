import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  private userService: UserServiceService;

  constructor(private router: Router, userService: UserServiceService) {
    this.userService = userService;
  }

  ngOnInit(): void {
  }

  public logout() {
    this.userService.logout();
    this.router.navigate(["Home"]);
  }

}
