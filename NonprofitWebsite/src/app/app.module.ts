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
import { OrganizationAddComponent } from './organization-add/organization-add.component';
import { OrganizationGetComponent } from './organization-get/organization-get.component';
import { HttpClientModule } from '@angular/common/http';
import { EventsService } from './events.service';
import { AccountCreateComponent } from './account-create/account-create.component';
import { TestComponent } from './test/test.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EventAddComponent,
    EventGetComponent,
    EventEditComponent,
    OrganizationAddComponent,
    OrganizationGetComponent,
    AccountCreateComponent,
    HomeComponent,
    TestComponent
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
  providers: [EventsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
