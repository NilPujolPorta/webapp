import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminCreateUserComponent } from './Projecte/Components/admin-create-user/admin-create-user.component';
import { CalendarComponent } from './Projecte/Components/calendar/calendar.component';
import { ListComponent } from './Projecte/Components/list/list.component';
import { LoginComponent } from './Projecte/Components/login/login.component';
import { SignupComponent } from './Projecte/Components/signup/signup.component';
import { ListDeleteComponent } from './Projecte/Components/list-delete/list-delete.component';


const routes: Routes = [
  { path: 'calendar', component: CalendarComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SignupComponent },
  { path: 'registerAdmin', component: AdminCreateUserComponent },
  { path: 'listJourney', component: ListComponent },
  { path: 'listDelete', component: ListDeleteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
