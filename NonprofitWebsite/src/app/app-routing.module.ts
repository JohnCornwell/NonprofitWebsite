import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EventAddComponent } from './event-add/event-add.component';
import { EventEditComponent } from './event-edit/event-edit.component';
import { EventGetComponent } from './event-get/event-get.component';
import { AccountCreateComponent } from './account-create/account-create.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [ 
  { 
    path: '', 
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  { 
    path: 'login', 
    component: LoginComponent
  },
  {
    path: 'event/create',
    component: EventAddComponent
  },
  {
    path: 'account/create',
    component: AccountCreateComponent
  },
  {
    path: 'edit/:id',
    component: EventEditComponent
  },
  {
    path: 'events',
    component: EventGetComponent
  },
  {
    path: 'test',
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
