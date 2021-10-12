import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EventAddComponent } from './event-add/event-add.component';
import { EventEditComponent } from './event-edit/event-edit.component';
import { EventGetComponent } from './event-get/event-get.component';

const routes: Routes = [ 
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
    path: 'edit/:id',
    component: EventEditComponent
  },
  {
    path: 'events',
    component: EventGetComponent
  },
  { 
    path: '**', 
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
