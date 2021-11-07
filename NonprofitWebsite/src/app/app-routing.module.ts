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
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { VolunteerEventListComponent } from './volunteer-event-list/volunteer-event-list.component';
import { VolunteerHomeComponent } from './volunteer-home/volunteer-home.component';

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
    path: 'Home/admin',
    component: AdminHomeComponent
  },
  {
    path: 'Home/volunteer',
    component: VolunteerHomeComponent
  },
  {
    path: 'Volunteer/events',
    component: VolunteerEventListComponent
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
    path: 'Events',
    component: EventGetComponent
  },
  {
    path: 'Test',
    component: TestComponent
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
