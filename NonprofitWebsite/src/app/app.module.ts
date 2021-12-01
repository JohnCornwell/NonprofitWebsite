import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { EventAddComponent } from './event-add/event-add.component';
import { EventGetComponent } from './event-get/event-get.component';
import { EventEditComponent } from './event-edit/event-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AccountCreateComponent } from './account-create/account-create.component';
import { TestComponent } from './test/test.component';
import { ProgramGetComponent } from './program-get/program-get.component';
import { ProgramAddComponent } from './program-add/program-add.component';
import { EventManageComponent } from './event-manage/event-manage.component';
import { VolunteerEventListComponent } from './volunteer-event-list/volunteer-event-list.component';
import { VolunteerHomeComponent } from './volunteer-home/volunteer-home.component';
import { DonationAddComponent } from './donation-add/donation-add.component';
import { DonorHomeComponent } from './donor-home/donor-home.component';
import { VolunteerComponent } from './volunteer/volunteer.component';
import { MyEventsComponent } from './my-events/my-events.component';
import { MyDonationsComponent } from './my-donations/my-donations.component';
import { HelpComponent } from './help/help.component';
import { ViewDonorComponent } from './view-donor/view-donor.component';
import { ViewVolunteerComponent } from './view-volunteer/view-volunteer.component';
import { UsersListComponent } from './users-list/users-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EventAddComponent,
    EventGetComponent,
    EventEditComponent,
    AccountCreateComponent,
    HomeComponent,
    TestComponent,
    ProgramGetComponent,
    ProgramAddComponent,
    EventManageComponent,
    VolunteerEventListComponent,
    VolunteerHomeComponent,
    DonationAddComponent,
    DonorHomeComponent,
    VolunteerComponent,
    MyEventsComponent,
    MyDonationsComponent,
    UsersListComponent,
    HelpComponent,
    ViewDonorComponent,
    ViewVolunteerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
