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
import { ReactiveFormsModule } from '@angular/forms';
import { OrganizationAddComponent } from './organization-add/organization-add.component';
import { OrganizationGetComponent } from './organization-get/organization-get.component';
import { HttpClientModule } from '@angular/common/http';
import { EventsService } from './events.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EventAddComponent,
    EventGetComponent,
    EventEditComponent,
    OrganizationAddComponent,
    OrganizationGetComponent,
    HttpClientModule
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [EventsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
