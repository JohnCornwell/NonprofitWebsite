import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EventAddComponent } from './event-add/event-add.component';
import { EventEditComponent } from './event-edit/event-edit.component';
import { EventGetComponent } from './event-get/event-get.component';
import { AccountCreateComponent } from './account-create/account-create.component';
import { DonationAddComponent } from './donation-add/donation-add.component';
import { TestComponent } from './test/test.component';
import { EventManageComponent } from './event-manage/event-manage.component';
import { VolunteerEventListComponent } from './volunteer-event-list/volunteer-event-list.component';
import { VolunteerHomeComponent } from './volunteer-home/volunteer-home.component';
import { DonorHomeComponent } from './donor-home/donor-home.component';
import { MyEventsComponent } from './my-events/my-events.component';
import { MyDonationsComponent } from './my-donations/my-donations.component';
import { VolunteerComponent } from './volunteer/volunteer.component';
import { HelpComponent } from "./help/help.component";
import { ViewDonorComponent } from "./view-donor/view-donor.component";
import { ViewVolunteerComponent } from "./view-volunteer/view-volunteer.component";
import { UsersListComponent } from './users-list/users-list.component';

/*
 * This class is responsible for directing a user to a specific page based on the
 * given http address.
 */

const routes: Routes = [ 
  { 
    path: '', 
    component: HomeComponent
  },
  {
    path: 'Home',
    component: HomeComponent
  },
  {
    path: 'Events',
    component: EventManageComponent
  },
  {
    path: 'Home/volunteer',
    component: VolunteerHomeComponent
  },
  {
    path: 'Home/donor',
    component: DonorHomeComponent
  },
  {
    path: 'Volunteer/events',
    component: VolunteerEventListComponent
  },
  {
    path: 'Volunteer',
    component: VolunteerComponent
  },
  {
    path: 'Logout',
    component: LogoutComponent
  },
  { 
    path: 'Login', 
    component: LoginComponent
  },
  {
    path: 'Event/create',
    component: EventAddComponent
  },
  {
    path: 'Donation/create',
    component: DonationAddComponent
  },
  {
    path: 'Account/create',
    component: AccountCreateComponent
  },
  {
    path: 'Event/edit/:id',
    component: EventEditComponent
  },
  {
    path: 'Event/edit',
    component: EventEditComponent
  },
  {
    path: 'Donor/:id',
    component: ViewDonorComponent
  },
  {
    path: 'Volunteer/:id',
    component: ViewVolunteerComponent
  },
  {
    path: 'Events',
    component: EventGetComponent
  },
  {
    path: 'MyEvents',
    component: MyEventsComponent
  },
  {
    path: 'MyDonations',
    component: MyDonationsComponent
  },
  {
    path: 'Test',
    component: TestComponent
  },
  {
    path: 'Help',
    component: HelpComponent
  },
  {
    path: 'Users',
    component: UsersListComponent
  },
  { 
    path: '**', 
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ReactiveFormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
